//
//  MainTableViewController.m
//  Calculator_NET
//
//  Created by Mark Lewis on 16-3-10.
//  Copyright (c) 2016年 Mark Lewis. All rights reserved.
//

#import "MainTableViewController.h"
#import "JLUtility.h"
#import "RCTRootView.h"
#import "AppDelegate.h"
#define kNullAddressValue @"255.255.255.255"
@interface MainTableViewController ()<UIAlertViewDelegate>
{
    int _networkNumCount;
}
@property(nonatomic, strong) NSMutableArray *numbers;
@property(nonatomic, strong) NSArray *ipComponents;
@end

@implementation MainTableViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  // self.subnetMaskLabel.text = @"132.180.127.192";
  [self setupUI];
  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"2048!" style:UIBarButtonItemStylePlain target:self action:@selector(openReactNativeUI)];

}
- (void)setupUI {
  self.title = @"IPv4 Subnet Calculator";
  UIButton *calculator = [[UIButton alloc] init];
  [calculator addTarget:self action:@selector(playButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
  [calculator setTitle:@"Start" forState:UIControlStateNormal];
  calculator.frame = CGRectMake(0, 0, 200, 50);
  calculator.center = self.view.center;
  calculator.backgroundColor = [UIColor orangeColor];
  CGRect tempF = calculator.frame;
  tempF.origin.y = [[UIScreen mainScreen] bounds].size.height - 100;
  calculator.frame = tempF;
  [self.view addSubview:calculator];
  
  
  UIBarButtonItem *flexibleItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
  UIBarButtonItem *playButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemPlay
                                                                              target:self
                                                                              action:@selector(playButtonPressed:)];
  
  self.view.backgroundColor = [UIColor whiteColor];
  [self setToolbarItems:@[flexibleItem, playButton]];

  self.pickerView.dataSource = self;
  self.pickerView.delegate = self;
  
  self.numbers = [NSMutableArray arrayWithObject:@"0"];
  for (int i=1; i<256; i++)
  {
      NSString *str = [NSString stringWithFormat:@"%d", i];
      [self.numbers addObject:str];
  }
  
//  NSLog(@"%@", _numbers);
  // pickerView
  CGFloat sw = [UIScreen.mainScreen bounds].size.width;
  CGFloat navH = [[UIApplication sharedApplication] statusBarFrame].size.height + 44.0;
  UILabel *headerTitle = [[UILabel alloc] initWithFrame:CGRectMake(0, navH, sw, 25)];
  [headerTitle setTextAlignment:NSTextAlignmentCenter];
//  headerTitle.textColor = [UIColor colorWithRed:200 green:200 blue:200 alpha:1];
  headerTitle.text = @"IP Address choose:";
  UIPickerView *picker = [[UIPickerView alloc] initWithFrame:CGRectMake(0, navH + 20, sw, 180)];
  [self.view addSubview:picker];
  picker.delegate = self;
  picker.dataSource = self;
  self.pickerView = picker;
  [self.view addSubview:headerTitle];
  [self performSelector:@selector(initPickerViewValue) withObject:nil afterDelay:0.5];
  
  [self setSubView];
}

- (void)setSubView {
  CGFloat y = self.pickerView.frame.origin.y + self.pickerView.frame.size.height;
  CGFloat sw = [UIScreen.mainScreen bounds].size.width;
  CGFloat navH = [[UIApplication sharedApplication] statusBarFrame].size.height + 44.0;
  UILabel *headerTitle1 = [[UILabel alloc] initWithFrame:CGRectMake(8, 30+y, 100, 25)];
  headerTitle1.textColor = [UIColor redColor];
  headerTitle1.text = @"Binary Result:";
  headerTitle1.font = [UIFont systemFontOfSize:13];
  [self.view addSubview:headerTitle1];
  
  UILabel *addressLabel = [[UILabel alloc] initWithFrame:CGRectMake(10, 60+y, sw, 25)];
  self.addressLabel = addressLabel;
  self.addressLabel.font = [UIFont systemFontOfSize:17];
  self.addressLabel.textColor = [UIColor blackColor];
  self.addressLabel.text = @"128.128.128.1280";
  [self.view addSubview:addressLabel];
  
  UILabel *addressBinaryLabel = [[UILabel alloc] initWithFrame:CGRectMake(10 , 90+y, sw, 25)];
  self.addressBinaryLabel = addressBinaryLabel;
  NSString *binary128String = @"10000000";
  self.addressBinaryLabel.text = [NSString stringWithFormat:@"Binary : %@ %@ %@ %@", binary128String, binary128String, binary128String, binary128String];
  self.addressBinaryLabel.font = [UIFont systemFontOfSize:11];
  self.addressBinaryLabel.textColor = [UIColor lightGrayColor];
  [self.view addSubview:addressBinaryLabel];
}

#pragma mark Alert View
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if(alertView.tag == 1)
    {
        if (buttonIndex == 1) //OK
        {
            UITextField *textField = [alertView textFieldAtIndex:0];
            NSArray *array = [textField.text componentsSeparatedByString:@"/"];
            if(array.count>1) _networkNumCount = [array[1] intValue];
            // calc
            NSString *mask = [self subnetMaskValueWithNetNumber:_networkNumCount]; // mask
            self.subnetMaskLabel.text = mask;
            
            //network address
            NSMutableArray *netAddress = [self calculateIP:[self loadPickerViewValueForLabel] withMask:mask];
            self.netAddressLabel.text = [netAddress componentsJoinedByString:@"."];
            
            //broadcast address
            self.broadcastLabel.text = [self calculateBroadcastWithNetNumber:_networkNumCount];
            
            
            
            // result alert
            UIAlertView *ResultAlert = [[UIAlertView alloc] initWithTitle:@"Result Unknow"
                                                            message:nil
                                                           delegate:self
                                                  cancelButtonTitle:nil
                                                  otherButtonTitles:@"Done", nil];
            
            ResultAlert.tag = 2;
            [ResultAlert show];
            
        }
    }
    else if(alertView.tag == 2)
    {
        // 更新结果到四个文本框
        
    }
    
    
}
- (void)playButtonPressed:(id)sender
{
    NSString *IPString = [self loadPickerViewValueForLabel];
    NSString *text = IPString;
    NSArray *array = [IPString componentsSeparatedByString:@"."];
    if(array.count > 1)
    {
        NSString *str = array[0];
        if ([str intValue] <128)
        {
            IPString = [NSString stringWithFormat:@"%@IP : %@", @"A类", IPString];
        }
        else if ([str intValue] < 192)
        {
            IPString = [NSString stringWithFormat:@"%@IP : %@", @"B类", IPString];
        }
        else if ([str intValue] < 224)
        {
            IPString = [NSString stringWithFormat:@"%@IP : %@", @"B类", IPString];
        }
        else if ([str intValue] < 239)
        {
            IPString = [NSString stringWithFormat:@"%@IP : %@", @"D类", IPString];
        }
    }
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:IPString
                                                    message:@"enter net number count:"
                                                   delegate:self
                                          cancelButtonTitle:@"Cancel"
                                          otherButtonTitles:@"Done", nil];
    
    [alert setAlertViewStyle:UIAlertViewStylePlainTextInput];
    UITextField *textField = [alert textFieldAtIndex:0];
    [textField setKeyboardType:UIKeyboardTypeNumberPad];
    textField.text = [NSString stringWithFormat:@"%@/", text];
    alert.tag = 1;
    [alert show];
}

- (void)initPickerViewValue
{
    [self.pickerView selectRow:128 inComponent:0 animated:YES];
    [self.pickerView selectRow:128 inComponent:1 animated:YES];
    [self.pickerView selectRow:128 inComponent:2 animated:YES];
    [self.pickerView selectRow:128 inComponent:3 animated:YES];
}

- (NSString *)loadPickerViewValueForLabel
{
    NSString *row1 = self.numbers[[_pickerView selectedRowInComponent:0]];
    NSString *row2 = self.numbers[[_pickerView selectedRowInComponent:1]];
    NSString *row3 = self.numbers[[_pickerView selectedRowInComponent:2]];
    NSString *row4 = self.numbers[[_pickerView selectedRowInComponent:3]];
    
    NSString *valueStr = [NSString stringWithFormat:@"%@.%@.%@.%@", row1, row2, row3, row4];
    
    return valueStr;
}

#pragma mark - picker view data source
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return 4;
}

- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    return self.numbers.count;
}

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    return self.numbers[row];
}

-(CGFloat)pickerView:(UIPickerView *)pickerView widthForComponent:(NSInteger)component
{
    return 70.0f;
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
    NSString *ipAddress = [self loadPickerViewValueForLabel];
    NSMutableArray *addresses = [[ipAddress componentsSeparatedByString:@"."] mutableCopy];
    self.addressLabel.text = ipAddress;

    if(addresses.count<4) return;
    for(int i = 0; i < addresses.count; i++)
    {
        NSString *snippet = addresses[i];
        snippet = printBinary([snippet intValue]);
        addresses[i] = [snippet substringWithRange:NSMakeRange(24, 8)]; // 截取子字符串，并且得到后八位
    }
    
    _ipComponents = [addresses copy];
    _addressBinaryLabel.text = [NSString stringWithFormat:@"Binary : %@", [addresses componentsJoinedByString:@"."]];
    

}
#pragma mark - Table view data source

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/


#pragma mark - Network address calculator
- (NSMutableArray *)calculateIP:(NSString *)ipFormat withMask:(NSString *)maskFormat
{
    NSMutableArray *resultArray = [NSMutableArray arrayWithCapacity:4];
    NSArray *ipSnippet = [ipFormat componentsSeparatedByString:@"."];
    NSArray *maskSnippet = [maskFormat componentsSeparatedByString:@"."];
    
    
    if(ipSnippet.count<4 || maskSnippet.count<4)
    {
    }
    else
    {
        for(int i = 0; i < 4; i++)
        {
            NSNumber *result = @([ipSnippet[i] intValue] & [maskSnippet[i] intValue]);
            [resultArray addObject:result];
        }

    }
    
    return resultArray;
}

- (NSString *)calculateBroadcastWithNetNumber:(int)n
{
    NSMutableArray *array = [self getBroadcastWithCount:n];
    
    return [array componentsJoinedByString:@"."];
}

- (NSMutableArray *)getBroadcastWithCount:(int)n
{
    if(_ipComponents.count < 4) return nil;
    int result[4] = {0};
    
    if (n>24) // C类地址的处理情况
    {
        for (int i=0; i<_ipComponents.count; i++)
        {
            if (i < 3)
            {
                result[i] = [JLUtility binaryToDec:(NSString *)_ipComponents[i]];
            }
            else
            {
                NSString *componentStr = _ipComponents[3];
                NSRange headerRange = NSMakeRange(0, n-24);
                NSMutableString *zeros = [NSMutableString string];
                for(int i = 0; i < (32-n); i++) [zeros appendFormat:@"1"];
                
                NSString * str = [NSString stringWithFormat:@"%@%@",[componentStr substringWithRange:headerRange], zeros];
                result[3] = [JLUtility binaryToDec:str];
            }
        }
    }
    
    if (n>17 && n<25) // 处理17-24情况
    {
        for (int i=0; i<_ipComponents.count; i++)
        {
            if (i < 2)
            {
                result[i] = [JLUtility binaryToDec:(NSString *)_ipComponents[i]];
            }
            else if(i == 2)
            {
                NSString *componentStr = _ipComponents[i];
                NSRange headerRange = NSMakeRange(0, n-16);
                NSMutableString *zeros = [NSMutableString string];
                for(int i = 0; i < (24-n); i++) [zeros appendFormat:@"1"];
                
                NSString * str = [NSString stringWithFormat:@"%@%@",[componentStr substringWithRange:headerRange], zeros];
                result[i] = [JLUtility binaryToDec:str];
   
            }
            else if(i==3)
            {
                NSMutableString *zeros = [NSMutableString string];
                for(int i = 0; i<8; i++) [zeros appendFormat:@"1"];
                NSString * str = [NSString stringWithFormat:@"%@", zeros];
                result[3] = [JLUtility binaryToDec:str];
            }
        }
    }

    
    NSMutableArray *resultArray = [NSMutableArray arrayWithCapacity:4];
    for(int i = 0; i < 4; i++) resultArray[i] = [NSString stringWithFormat:@"%d", result[i]];
    return resultArray;
}


-(NSMutableArray *)getNetworkMaskWithCount:(int)n
{
    if(_ipComponents.count < 4) return nil;
    // NSString *ipStr = [_ipComponents componentsJoinedByString:@""];
    // int addressNum = [ipStr intValue];
    int result[4] = {0};
    
    if (n>24) // C类地址的处理情况
    {
        for (int i=0; i<_ipComponents.count; i++)
        {
            if (i < 3)
            {
                NSMutableString *beforeOne = [NSMutableString string];
                for(int i = 0; i<8; i++) [beforeOne appendFormat:@"1"];
                result[i] = [JLUtility binaryToDec:beforeOne];
            }
            else
            {
                // NSString *componentStr = _ipComponents[3];
                // NSRange headerRange = NSMakeRange(0, n-24);
                NSMutableString *zeros = [NSMutableString string];
                for(int i = 0; i < (32-n); i++) [zeros appendFormat:@"0"];
                
                NSMutableString *beforeOnes = [NSMutableString stringWithCapacity:n-24];
                for(int i = 0; i < (n-24); i++) [beforeOnes appendFormat:@"1"];
                
                NSString * str = [NSString stringWithFormat:@"%@%@",beforeOnes , zeros];
                result[3] = [JLUtility binaryToDec:str];
            }
        }
    }
    
    if (n>17 && n<25) // 处理17-24情况
    {
        for (int i=0; i<_ipComponents.count; i++)
        {
            if (i < 2)
            {
                NSMutableString *beforeOne = [NSMutableString string];
                for(int i = 0; i<8; i++) [beforeOne appendFormat:@"1"];
                result[i] = [JLUtility binaryToDec:beforeOne];
            }
            else if(i == 2)
            {
                NSMutableString *zeros = [NSMutableString string];
                for(int i = 0; i < (24-n); i++) [zeros appendFormat:@"0"];
                
                NSMutableString *beforeOnes = [NSMutableString stringWithCapacity:8];
                for(int i = 0; i < (n-16); i++) [beforeOnes appendFormat:@"1"];
                
                NSString * str = [NSString stringWithFormat:@"%@%@",beforeOnes , zeros];
                result[3] = [JLUtility binaryToDec:str];
                
            }
            else if(i==3)
            {
                NSMutableString *zeros = [NSMutableString string];
                for(int i = 0; i<8; i++) [zeros appendFormat:@"0"];
                NSString * str = [NSString stringWithFormat:@"%@", zeros];
                result[3] = [JLUtility binaryToDec:str];
            }
        }
    }
    
    NSMutableArray *resultArray = [NSMutableArray arrayWithCapacity:4];
    for(int i = 0; i < 4; i++) resultArray[i] = [NSString stringWithFormat:@"%d", result[i]];
    return resultArray;
}

- (NSString *) subnetMaskValueWithNetNumber:(int)count
{
    NSMutableArray *components = [self getNetworkMaskWithCount:count];
    return [components componentsJoinedByString:@"."];
}



// 返回二进制格式的算法，封装为函数
NSString * printBinary(int n)
{
    // int temp = sizeof(int)<<3 - 1;
    int temp = 31;
    NSString *result = @"";
    while (temp >= 0)
    {
        int value = n >> temp & 1;
        result = [NSString stringWithFormat:@"%@%d", result, value];
        
        temp--;
        
//        if ((temp + 1) % 4 == 0)
//        {
//            result = [NSString stringWithFormat:@"%@ ", result];
//        }
    }
    // result = [NSString stringWithFormat:@"%@\n", result];
    
    
    return result;
}



/// React
- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event {
  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"2048!" style:UIBarButtonItemStylePlain target:self action:@selector(openReactNativeUI)];
}
- (void)openReactNativeUI {
  AppDelegate *delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  NSURL *jsCodeLocation;

  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */

//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.103:8081/index.ios.bundle?platform=ios&dev=true"];

  /**
   * OPTION 2
   * Load from pre-bundled file on disk. The static bundle is automatically
   * generated by the "Bundle React Native code and images" build step when
   * running the project on an actual device or running the project on the
   * simulator in the "Release" build configuration.
   */
//  NSString *path = [[NSBundle mainBundle] pathForResource:@"main.jsbundle" ofType:nil];
//  jsCodeLocation = [NSURL fileURLWithPath:path];
  // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  
  NSArray *imageList = @[@"http://foo.com/bar1.png",
                  @"http://foo.com/bar2.png"];
   
  NSDictionary *props = @{@"images" : imageList};
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AImageDemo"
                                               initialProperties:props
                                                   launchOptions:delegate.launchOptions];
  
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  rootViewController.edgesForExtendedLayout = NO;
  rootViewController.title = @"Games";
  [self.navigationController pushViewController:rootViewController animated:true];
}
@end

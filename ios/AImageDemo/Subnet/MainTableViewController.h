//
//  MainTableViewController.h
//  Calculator_NET
//
//  Created by Mark Lewis on 16-3-10.
//  Copyright (c) 2016年 Mark Lewis. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MainTableViewController : UIViewController<UIPickerViewDelegate, UIPickerViewDataSource>

@property (weak, nonatomic) UIPickerView *pickerView;
@property (weak, nonatomic) UILabel *subnetMaskLabel;
@property (weak, nonatomic) UILabel *netAddressLabel;
@property (weak, nonatomic) UILabel *broadcastLabel;
@property (weak, nonatomic) UILabel *addressLabel;
@property (weak, nonatomic) UILabel *addressBinaryLabel;
@end

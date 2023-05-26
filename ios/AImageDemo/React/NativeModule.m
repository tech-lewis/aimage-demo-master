//
//  NativeModule.m
//  AImageDemo
//
//  Created by Mark on 2022/10/5.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "NativeModule.h"
@interface NativeModule ()<RCTBridgeModule>
@property (nonatomic) RCTPromiseResolveBlock normalResolve;
@property (nonatomic) RCTPromiseRejectBlock normalReject;
@property (nonatomic) NSInteger num;
@end

@implementation NativeModule
// 这句代码是必须的 用来导出 module, 这样才能在 RN 中访问 nativeModule这个 module
RCT_EXPORT_MODULE();

// 接收字符串
RCT_EXPORT_METHOD(addHelloWord:(NSString *)name location:(NSString *)location)
{
 NSLog(@"%@,%@", name, location);
}

// 只接受一个参数——传递给 JavaScript 回调函数的参数数组。
RCT_EXPORT_METHOD(checkIsRoot:(RCTResponseSenderBlock)callback) {
  NSArray *array = @[@"string", @"number"];
  callback(array);
}
// 这是一个计时器
-(void)startTime: (NSArray*) data{
  NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:2 repeats:YES block:^(NSTimer * _Nonnull timer) {
    
    NSArray *events =@[@"Promise ",@"test ",@" array"];
    if (events) {
      self.normalResolve(events);
      [timer invalidate];
    } else {
      [timer invalidate];
      NSError *error=[NSError errorWithDomain:@"我是回调错误信息..." code:101 userInfo:nil];
      self.normalReject(@"no_events", @"There were no events", error);
    }
  }];
  
  [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];
}
 
// 回调给RN的参数，回调的错误信息
RCT_EXPORT_METHOD(getHBDeviceUniqueID: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  
  // 要执行的任务
  self.normalResolve = resolve;
  self.normalReject = reject;
  
  [self performSelectorOnMainThread:@selector(startTime:) withObject: [NSArray arrayWithObjects: @"1", @"2", nil] waitUntilDone:YES];
}
@end

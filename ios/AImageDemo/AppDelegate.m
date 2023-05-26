/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "MainTableViewController.h"

@interface AppDelegate () {}
@property (nonatomic, weak) UINavigationController *nav;
@end
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.launchOptions = launchOptions;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:[MainTableViewController new]];
//  [self performSelector:@selector(openNativeUI) withObject:nil afterDelay:0.1];
  self.window.rootViewController = navController;
  self.nav = navController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end

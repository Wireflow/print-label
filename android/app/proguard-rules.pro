# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

-keep public class com.gengcon.www.jcprintersdk.**{*;}
-keep public class com.niimbot.canvas.image.**{*; }
-keep public class com.dothantech.**{*;}
-keep public class zpSDK.zpSDK.**{*;}
-keep public class com.snbc.sdk.**{*;}
-keep public class android_serialport_api.**{*;}
-dontwarn com.gengcon.www.jcprintersdk.**
-dontwarn com.jingchen.jcimagesdk.**
-dontwarn com.niimbot.canvas.image.**
-dontwarn com.dothantech.**
-dontwarn zpSDK.zpSDK.**
-dontwarn com.snbc.sdk.**
-dontwarn android_serialport_api.**

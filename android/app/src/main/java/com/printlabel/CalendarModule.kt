package com.printlabel

import android.util.Log
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CalendarModule"

    @ReactMethod fun createName(name: String, promise: Promise) {
        val message = "$name was created"
        Log.d("CalendarModule", "Create event called with name: $name")
        promise.resolve(message)
    }

}
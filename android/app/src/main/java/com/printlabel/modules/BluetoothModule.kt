package com.printlabel.modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.printlabel.bean.BlueDeviceInfo

class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BluetoothModule"
    }

    private var blueDeviceInfoList: List<BlueDeviceInfo?>? = null

    fun BlueDeviceAdapter(blueDeviceInfoList: List<BlueDeviceInfo?>?) {
        this.blueDeviceInfoList = blueDeviceInfoList
    }



}

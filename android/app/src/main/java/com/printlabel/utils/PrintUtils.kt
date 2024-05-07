// package com.printlabel.utils

// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.bridge.ReactContext
// import com.facebook.react.bridge.ReactContextBaseJavaModule
// import com.gengcon.www.jcprintersdk.JCPrintApi
// import com.gengcon.www.jcprintersdk.callback.Callback
// import com.printlabel.MainApplication
// import java.io.File

// class PrintUtils(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

//     override fun getName() = "PrintUtils"

//     private val TAG = "PrintUtil"
//     private var mConnectedType = -1
//     private var api: JCPrintApi? = null

//     /**
//      * Callback interface for handling printer status change events
//      */
//     private val CALLBACK: Callback = object : Callback {
//         /**
//          * Connection success callback
//          *
//          * @param address device address, Bluetooth for Bluetooth MAC address, WIFI for IP address
//          * @param type connection type, 0 for Bluetooth connection, 1 for WIFI connection
//          */
//         override fun onConnectSuccess(address: String, type: Int) {
//             mConnectedType = type
//         }

//         /**
//          * Disconnect callback
//          * Called when the device is disconnected.
//          */
//         override fun onDisConnect() {
//             mConnectedType = -1
//         }

//         /**
//          * Battery change callback
//          * Called when the device battery level changes.
//          *
//          * @param powerLevel battery level, ranging from 1 to 4, representing 1 to 4 bars of battery, full battery is 4 bars
//          */
//         override fun onElectricityChange(powerLevel: Int) {}

//         /**
//          * Monitor cover status change callback
//          * Called when the cover status changes. Currently, this callback only supports H10/D101/D110/D11/B21/B16/B32/Z401/B3S/B203/B1/B18 series printers.
//          *
//          * @param coverStatus cover status, 0 for cover open, 1 for cover closed
//          */
//         override fun onCoverStatus(coverStatus: Int) {}

//         /**
//          * Monitor paper status change
//          * Called when the paper status changes. Currently, this callback only supports H10/D101/D110/D11/B21/B16/B32/Z401/B203/B1/B18 series printers.
//          *
//          * @param paperStatus 0 for paper not missing, 1 for paper missing
//          */
//         override fun onPaperStatus(paperStatus: Int) {}

//         /**
//          * Monitor label rfid read status change
//          * Called when the label rfid read status changes.
//          *
//          * @param rfidReadStatus 0 for tag RFID not read, 1 for tag RFID read successfully. Currently, this callback only supports H10/D101/D110/D11/B21/B16/B32/Z401/B203/B1/B18 series printers.
//          */
//         override fun onRfidReadStatus(rfidReadStatus: Int) {}

//         /**
//          * Monitor ribbon rfid read status change
//          * Called when the ribbon rfid read status changes.
//          *
//          * @param ribbonRfidReadStatus 0 for ribbon RFID not read, 1 for ribbon RFID read successfully. Currently, this callback only supports B18/B32/Z401/P1/P1S series printers.
//          */
//         override fun onRibbonRfidReadStatus(ribbonRfidReadStatus: Int) {}

//         /**
//          * Monitor ribbon status change
//          * Called when the ribbon status changes.
//          *
//          * @param ribbonStatus 0 for no ribbon, 1 for ribbon present. Currently, this callback only supports B18/B32/Z401/P1/P1S series printers.
//          */
//         override fun onRibbonStatus(ribbonStatus: Int) {}

//         /**
//          * Firmware error callback, requires upgrade
//          * Called when the device is successfully connected but encounters a firmware error, indicating that a firmware upgrade is required.
//          */
//         override fun onFirmErrors() {}
//     }

//     /**
//      * Get the singleton instance of JCPrintApi.
//      *
//      * @return JCPrintApi instance
//      */
//     fun getInstance(): JCPrintApi {
//         // Double-checked locking to ensure the instance is only initialized once
//         if (api == null) {
//             synchronized(PrintUtils::class.java) {
//                 if (api == null) {
//                     api = JCPrintApi.getInstance(CALLBACK)
//                     api?.initSdk(MainApplication.getInstance())
//                     val directory: File = MainApplication.getInstance().filesDir
//                     val customFontDirectory = File(directory, "custom_font")
//                     api?.initDefaultImageLibrarySettings(customFontDirectory.absolutePath, "")
//                 }
//             }
//         }
//         return api!!
//     }

//     /**
//      * Connect to the printer using the printer's mac address (synchronously).
//      *
//      * @param address printer address
//      * @return success or failure
//      */
//     fun connectBluetoothPrinter(address: String): Int {
//         val localApi: JCPrintApi = getInstance()
//         return localApi.connectBluetoothPrinter(address)
//     }

//     /**
//      * Close the printer
//      */
//     fun close() {
//         val localApi: JCPrintApi = getInstance()
//         localApi.close()
//     }

//     /**
//      * Check if the printer is connected
//      *
//      * @return connection status code
//      */
//     fun isConnection(): Int {
//         val localApi: JCPrintApi = getInstance()
//         return localApi.isConnection()
//     }

//     /**
//      * Get the connected type
//      *
//      * @return connected type
//      */
//     fun getConnectedType(): Int {
//         return mConnectedType
//     }

//     /**
//      * Set the connected type
//      *
//      * @param connectedType connected type
//      */
//     fun setConnectedType(connectedType: Int) {
//         mConnectedType = connectedType
//     }

// }
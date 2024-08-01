package expo.modules.nsd

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat.requestPermissions
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.util.Log

class ExpoNsdModule : Module() {
    private var mdns: Mdns? = null

    private val context
        get() = requireNotNull(appContext.reactContext)

    private val activity
        get() = requireNotNull(appContext.currentActivity)

    private val requestCode = 0
    override fun definition() = ModuleDefinition {
        Name("ExpoNsd")

        Events("onServiceDiscovered")

        Function("requestPermissions") {
            if (ContextCompat.checkSelfPermission(
                            context,
                            Manifest.permission.ACCESS_NETWORK_STATE
                    ) == PackageManager.PERMISSION_GRANTED) {
            } else {
                requestPermissions(activity,
                        arrayOf(Manifest.permission.ACCESS_NETWORK_STATE
                        ),
                        requestCode
                )
            }
        }

        Function("configureDiscovery") { serviceType: String ->
            mdns = Mdns(context, serviceType) {
                this@ExpoNsdModule.sendEvent("onServiceDiscovered",
                        bundleOf(
                                "address" to it.address,
                                "port" to it.port,
                                "name" to it.name
                        ))
            }
        }

        Function("startDiscovery") {
            mdns?.startDiscovery()
        }

        Function("stopDiscovery") {
            mdns?.stopDiscovery()
        }

        Function("hello") {
            //"Hello world! 👋"
            Log.d("MOHAN", "debug debug")
            Log.i("MOHAN", "info info")
              if (ContextCompat.checkSelfPermission(
                            context,
                            Manifest.permission.ACCESS_NETWORK_STATE
                    ) == PackageManager.PERMISSION_GRANTED) {
                return@Function "permission granted"
            } else {
                return@Function "permission not granted"
            }
        }
    }


  /* 
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoNsd')` in JavaScript.
    Name("ExpoNsd")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }
  }

  */
}

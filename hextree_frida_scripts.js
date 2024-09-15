// Calling methods in hooked classes
Java.perform(() => {
    let FlagClass = Java.use("io.hextree.fridatarget.FlagClass");
    let FlagInstance = FlagClass.$new();
    console.log(FlagClass.flagFromStaticMethod());
    console.log(FlagInstance.flagFromInstanceMethod());
    console.log(FlagInstance.flagIfYouCallMeWithSesame("sesame"));
  })

// Getting current Activity and Fragment Name
Java.perform(() => {
    let ActivityClass = Java.use("android.app.Activity");
    let FragmentClass = Java.use("androidx.fragment.app.Fragment");
    ActivityClass.onResume.implementation = function() {
        console.log("Activity resumed:", this.getClass().getName());
        // Call original onResume method
        this.onResume();
    }
    FragmentClass.onResume.implementation = function() {
        console.log("Fragment resumed:", this.getClass().getName());
        // Call original onResume method
        this.onResume();
    }
})

// Changing return value of functions
Java.perform(() => {
    let InterceptionFragmentClass = Java.use("io.hextree.fridatarget.ui.InterceptionFragment");
    let DiceFragmentClass = Java.use("io.hextree.fridatarget.ui.DiceGameFragment");
    let LicenseClass = Java.use("io.hextree.fridatarget.LicenseManager");
    let SystemClass = Java.use('java.lang.System');

    InterceptionFragmentClass.function_to_intercept.implementation = function(argument) {
        console.log("Original Argument: ", argument);
        // Modify argument
        argument = "Argument Changed";
        return this.function_to_intercept(argument);
    }

    LicenseClass.isLicenseValid.implementation = function() {
        this.isLicenseValid();
        console.log("License Check set to true");
        return true;
    }
    
    SystemClass.currentTimeMillis.implementation = function() {
        this.currentTimeMillis();
        console.log("Setting time to valid timestamp");
        return 1672500000;
    }

    DiceFragmentClass.randomDice.implementation = function() {
        this.randomDice();
        console.log("Dice roll set to 5");
        return 5;
    }
})

//SSL Pinning using TrustManager/Network-Security-Config/OkHttp3 bypass
Java.perform(() => {
    var PlatformClass = Java.use("com.android.org.conscrypt.Platform");
    PlatformClass.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.AbstractConscryptSocket').implementation = function() {
        console.log("Check server trusted");
    }

    var BuilderClass = Java.use("okhttp3.OkHttpClient$Builder");
    BuilderClass.certificatePinner.implementation = function() {
        console.log("Certificate pinner called");
        return this;
    }
})
package com.vendor;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.os.Bundle;
// import com.digio.esignapplication.databinding.ActivityMainBinding;

// import in.digio.sdk.esign.Digio;
// import in.digio.sdk.esign.DigioResponse;
// import in.digio.sdk.esign.DigioResponseListener;
// import in.digio.sdk.esign.model.DigioEsignStateObject;
// import in.digio.sdk.gateway.enums.DigioEnvironment;
// import in.digio.sdk.gateway.enums.DigioServiceMode;
// import in.digio.sdk.gateway.event.model.GatewayEvent;
// import in.digio.sdk.gateway.model.AdditionalFunctionalInterfaces;
// import in.digio.sdk.gateway.model.DigioConfig;
// import in.digio.sdk.gateway.model.DigioTheme;
// import in.digio.sdk.gateway.model.OtherParams;



public class MainActivity extends ReactActivity {

    //-----------
//    private SignForm signForm = new SignForm();
//     Digio digio = new Digio();

//     ActivityMainBinding binding;
    //-----------

   @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  //---------------
//       DigioConfig digioConfig = new DigioConfig();
//         OtherParams otherParams = new OtherParams();
//         otherParams.setWhitelabelType("footer");
//         digioConfig.setOtherParams(otherParams);
//         DigioTheme theme = new DigioTheme();
// //        theme.setPrimaryColor(android.R.color.holo_red_dark);
//         theme.setPrimaryColorHex("#33ef07");
//         theme.setFontFamily("Unbounded");
//         theme.setSecondaryColorHex("#141414");
//         theme.setFontUrl("https://fonts.googleapis.com/css2?family=Unbounded:wght@200&display=swap");
// //        theme.setFontFormat("");
//         digioConfig.setTheme(theme);
//         digioConfig.setFaqButton(android.R.drawable.ic_menu_help);
//         digioConfig.setCloseButton(android.R.drawable.ic_menu_close_clear_cancel);
//         digioConfig.setLogo("https://www.digio.in/images/digio_blue.png"); // Your company logo url
//         digioConfig.setEnvironment(DigioEnvironment.PRODUCTION); // SANDBOX or PRODUCTION
//         digioConfig.setServiceMode(DigioServiceMode.OTP);  // FP/OTP/IRIS
//         try {
//             digio.init(this, digioConfig, this);
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }

//     private void signNow() {

//         try {
//             digio.start(signForm.getDocumentId(), signForm.getEmail()); //this refers DigioResponseListener
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }

//      @Override
//     public void onDigioSuccess(@NonNull DigioResponse digioResponse) {
//         signForm.setResponse(digioResponse.toString());
//         binding.response.setText(digioResponse.toString());
//     }

//     @Override
//     public void onDigioFailure(@NonNull DigioResponse digioResponse) {
//         signForm.setResponse(digioResponse.toString());
//         binding.response.setText(digioResponse.toString());
//     }

//     @Override
//     public void onGatewayEvent(@NonNull GatewayEvent gatewayEvent) {
//         System.out.println("gatewayEvent = " + gatewayEvent);
//     }

//     @Override
//     protected void onDestroy() {
//         digio.unRegisterEvent(this);
//         super.onDestroy();
//     }

//     @Override
//     public void onFaqClick(DigioEsignStateObject digioEsignStateObject) {
//         Log.d("TAG", "onFaqClick: " + digioEsignStateObject);
//         Toast.makeText(this, "Faq button clicked", Toast.LENGTH_SHORT).show();
//     }

//     @Override
//     public void onCloseClick(DigioEsignStateObject digioEsignStateObject) {
//         Log.d("TAG", "onCloseClick: " + digioEsignStateObject);
//         Toast.makeText(this, "Close button clicked", Toast.LENGTH_SHORT).show();
//     }

  //---------------


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Vendor";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
}

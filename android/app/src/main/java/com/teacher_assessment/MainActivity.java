package com.teacher_assessment;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashTheme);
            super.onCreate(savedInstanceState);
        }

    @Override
    protected String getMainComponentName() {
    return "teacher_assessment";
  }
}

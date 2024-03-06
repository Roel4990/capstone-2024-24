package com.kotlin.kiumee.presentation

import android.content.Intent
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityMainBinding
import com.kotlin.kiumee.presentation.login.LoginActivity

class MainActivity : BindingActivity<ActivityMainBinding>(R.layout.activity_main) {
    override fun initView() {
        startActivity(Intent(this, LoginActivity::class.java))
    }
}

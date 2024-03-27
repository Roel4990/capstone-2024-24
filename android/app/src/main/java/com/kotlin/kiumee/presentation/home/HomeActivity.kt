package com.kotlin.kiumee.presentation.home

import android.content.Intent
import com.bumptech.glide.Glide
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityHomeBinding
import com.kotlin.kiumee.presentation.menu.MenuActivity

class HomeActivity : BindingActivity<ActivityHomeBinding>(R.layout.activity_home) {
    override fun initView() {
        initScreenClickListener()
    }

    private fun initScreenClickListener() {
        binding.ivHomeBackground.setOnClickListener {
            startActivity(Intent(this, MenuActivity::class.java))
        }
    }
}

package com.kotlin.kiumee.presentation.home

import android.content.Intent
import com.bumptech.glide.Glide
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityHomeBinding
import com.kotlin.kiumee.presentation.select.SelectActivity

class HomeActivity : BindingActivity<ActivityHomeBinding>(R.layout.activity_home) {
    override fun initView() {
        initBackground()
        initScreenClickListener()
    }

    private fun initScreenClickListener() {
        binding.ivHomeBackground.setOnClickListener {
            startActivity(Intent(this, SelectActivity::class.java))
        }
    }

    private fun initBackground() {
        Glide.with(this)
            .load("https://cdn.newscj.com/news/photo/202307/3043256_3048062_3725.jpg")
            .centerCrop()
            .into(binding.ivHomeBackground)
    }
}

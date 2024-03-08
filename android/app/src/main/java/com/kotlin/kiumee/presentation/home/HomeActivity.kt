package com.kotlin.kiumee.presentation.home

import com.bumptech.glide.Glide
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityHomeBinding

class HomeActivity : BindingActivity<ActivityHomeBinding>(R.layout.activity_home) {
    override fun initView() {
        initBackground()
        initScreenClickListener()
    }

    private fun initScreenClickListener() {
        binding.ivHomeBackground.setOnClickListener {
            // hhx
        }
    }

    private fun initBackground() {
        Glide.with(this)
            .load("https://cdn.newscj.com/news/photo/202307/3043256_3048062_3725.jpg")
            .centerCrop()
            .into(binding.ivHomeBackground)
    }
}

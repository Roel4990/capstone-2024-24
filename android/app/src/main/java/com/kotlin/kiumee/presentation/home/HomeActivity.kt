package com.kotlin.kiumee.presentation.home

import android.content.Intent
import com.bumptech.glide.Glide
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityHomeBinding
import com.kotlin.kiumee.presentation.chat.ChatActivity

class HomeActivity : BindingActivity<ActivityHomeBinding>(R.layout.activity_home) {
    override fun initView() {
        initBackground()
        initScreenClickListener()
    }

    private fun initScreenClickListener() {
        binding.ivHomeBackground.setOnClickListener {
            startActivity(Intent(this, ChatActivity::class.java))
        }
    }

    private fun initBackground() {
        Glide.with(this)
            .load("https://lh3.googleusercontent.com/proxy/vtbz9OUETXc-KrI33FzQBGWEf8775hRdKRY5CYEG1H7Ue8e7jmHqQ2iejfChLJ-FWxyzRqdx3zlQokGEz7LfVW-Jf5oCYprofnMEIzWzPIQ2UZO1MOhuy0uXwRLbhXB66QLdudfRzk7JoEnqOsAmNKW0onAAqfwT7K57QKpyyxWG7cNjKg7n_yU-Wx4LAW9yIBdvFFGQCedUdFNjdNeHZoxAGGNG2eSo")
            .centerCrop()
            .into(binding.ivHomeBackground)
    }
}

package com.kotlin.kiumee.presentation.orderfinish

import android.content.Intent
import androidx.lifecycle.lifecycleScope
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityOrderFinishBinding
import com.kotlin.kiumee.presentation.chat.ChatActivity
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class OrderFinishActivity :
    BindingActivity<ActivityOrderFinishBinding>(R.layout.activity_order_finish) {
    override fun initView() {
        initTimer()
    }

    private fun initTimer() {
        lifecycleScope.launch {
            delay(5000) // 5초
            startActivity(Intent(this@OrderFinishActivity, ChatActivity::class.java))
            // 현재 액티비티 닫기
            finish()
        }
    }
}

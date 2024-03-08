package com.kotlin.kiumee.presentation.select

import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivitySelectBinding
import com.kotlin.kiumee.presentation.orderselect.OrderSelectFragment

class SelectActivity : BindingActivity<ActivitySelectBinding>(R.layout.activity_select) {
    override fun initView() {
        initActivityFragment()
    }

    private fun initActivityFragment() {
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.fcv_chat, OrderSelectFragment())
            commit()
        }
    }
}

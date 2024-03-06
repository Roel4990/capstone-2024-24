package com.kotlin.kiumee.presentation.login

import android.content.Intent
import androidx.core.widget.addTextChangedListener
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityLoginBinding
import com.kotlin.kiumee.presentation.form.FormActivity

class LoginActivity : BindingActivity<ActivityLoginBinding>(R.layout.activity_login) {
    override fun initView() {
        initTextChanged()
        initLoginBtnClickListener()
    }

    private fun initTextChanged() {
        binding.etLoginId.addTextChangedListener {
            initBtnChanged()
        }
        binding.etLoginPw.addTextChangedListener {
            initBtnChanged()
        }
    }

    private fun initBtnChanged() {
        with(binding) {
            if (etLoginId.text.isNotEmpty() and etLoginPw.text.isNotEmpty()) {
                btnLogin.setTextColor(resources.getColor(R.color.white))
                btnLogin.setBackgroundResource(R.drawable.shape_primary_fill_10_rect)
                btnLogin.isEnabled = true
            } else {
                btnLogin.setTextColor(resources.getColor(R.color.black))
                btnLogin.setBackgroundResource(R.drawable.shape_gray7_line_10_rect)
                btnLogin.isEnabled = false
            }
        }
    }

    private fun initLoginBtnClickListener() {
        binding.btnLogin.setOnClickListener {
            startActivity(Intent(this, FormActivity::class.java))
        }
    }
}

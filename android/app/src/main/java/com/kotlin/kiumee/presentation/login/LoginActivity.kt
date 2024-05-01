package com.kotlin.kiumee.presentation.login

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import androidx.activity.viewModels
import androidx.core.view.isVisible
import androidx.core.widget.addTextChangedListener
import androidx.lifecycle.flowWithLifecycle
import androidx.lifecycle.lifecycleScope
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.databinding.ActivityLoginBinding
import com.kotlin.kiumee.presentation.store.StoreActivity
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import timber.log.Timber

class LoginActivity : BindingActivity<ActivityLoginBinding>(R.layout.activity_login) {
    private val loginViewModel by viewModels<LoginViewModel>()
    private val sharedPreferences: SharedPreferences by lazy {
        getSharedPreferences("MyAppPrefs", Context.MODE_PRIVATE)
    }

    override fun initView() {
        initAppbarHomeBtn()
        initTextChanged()
        initObserve()
        initLoginBtnClickListener()
    }

    private fun initAppbarHomeBtn() {
        binding.appbarLogin.ibLoginHome.isVisible = false
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
                btnLogin.setBackgroundResource(R.drawable.shape_primary_fill_15_rect)
                btnLogin.isEnabled = true
            } else {
                btnLogin.setTextColor(resources.getColor(R.color.black))
                btnLogin.setBackgroundResource(R.drawable.shape_gray7_line_20_rect)
                btnLogin.isEnabled = false
            }
        }
    }

    private fun initObserve() {
        loginViewModel.postLogin.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> startActivity(Intent(this, StoreActivity::class.java))
                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> Timber.d("로딩중")
            }
        }.launchIn(lifecycleScope)
    }

    private fun initLoginBtnClickListener() {
        binding.btnLogin.setOnClickListener {
            loginViewModel.postLogin(
                binding.etLoginId.text.toString(),
                binding.etLoginPw.text.toString()
            )
        }
    }
}

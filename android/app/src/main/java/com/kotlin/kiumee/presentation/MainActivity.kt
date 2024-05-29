package com.kotlin.kiumee.presentation

import android.content.Intent
import androidx.activity.viewModels
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.databinding.ActivityMainBinding
import com.kotlin.kiumee.presentation.login.LoginActivity
import timber.log.Timber

class MainActivity : BindingActivity<ActivityMainBinding>(R.layout.activity_main) {
    private val exampleViewModel by viewModels<ExampleViewModel>()

    override fun initView() {
        startActivity(Intent(this, LoginActivity::class.java))
    }

    private fun exampleObserve() {
        exampleViewModel.exampleLiveData.observe(this) {
            when (it) {
                is UiState.Success -> Timber.d("성공")
                is UiState.Failure -> Timber.d("실패")
                is UiState.Loading -> Timber.d("로딩중")
                is UiState.Empty -> Timber.d("empty")
            }
        }
    }
}

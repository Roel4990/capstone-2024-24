package com.kotlin.kiumee.presentation.store

import android.content.Intent
import android.view.View
import androidx.activity.viewModels
import androidx.lifecycle.flowWithLifecycle
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.databinding.ActivityStoreBinding
import com.kotlin.kiumee.presentation.home.HomeActivity
import com.kotlin.kiumee.presentation.login.LoginActivity
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import timber.log.Timber

class StoreActivity : BindingActivity<ActivityStoreBinding>(R.layout.activity_store) {
    private val storeViewModel by viewModels<StoreViewModel>()

    override fun initView() {
        initHomeBtnClickListener()
        initObserve()
    }

    private fun initHomeBtnClickListener() {
        binding.appbarStore.ibLoginHome.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun initObserve() {
        storeViewModel.getStore.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> initFormAdapter(it.data)
                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> Timber.d("로딩중")
            }
        }.launchIn(lifecycleScope)
    }

    private fun initEmptyLayout() {
        with(binding) {
            tvStoreTitle.visibility = View.GONE
            rvStore.visibility = View.GONE
            layoutStoreEmpty.visibility = View.VISIBLE
        }
    }

    private fun initFormAdapter(storeData: List<StoreEntity>) {
        if (storeData.isEmpty()) {
            initEmptyLayout()
        } else {
            binding.rvStore.adapter = StoreAdapter(click = { storeData, position ->
                startActivity(Intent(this, HomeActivity::class.java))
            }).apply {
                submitList(storeData)
            }
            binding.rvStore.layoutManager =
                LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
            binding.rvStore.addItemDecoration(StoreItemDecorator(this))
        }
    }
}

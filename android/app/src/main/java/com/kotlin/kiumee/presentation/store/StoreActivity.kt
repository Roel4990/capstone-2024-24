package com.kotlin.kiumee.presentation.store

import android.content.Intent
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityStoreBinding
import com.kotlin.kiumee.presentation.home.HomeActivity
import com.kotlin.kiumee.presentation.login.LoginActivity

class StoreActivity : BindingActivity<ActivityStoreBinding>(R.layout.activity_store) {
    override fun initView() {
        initLayoutState()
        initHomeBtnClickListener()
    }

    private fun initHomeBtnClickListener() {
        binding.appbarStore.ibLoginHome.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun initLayoutState() {
        // 추후 코드 변경 필요
        if (true) {
            initFormAdapter()
        } else {
            initEmptyLayout()
        }
    }

    private fun initEmptyLayout() {
        with(binding) {
            tvStoreTitle.visibility = View.GONE
            rvStore.visibility = View.GONE
            layoutStoreEmpty.visibility = View.VISIBLE
        }
    }

    private fun initFormAdapter() {
        binding.rvStore.adapter = StoreAdapter(click = { store, position ->
            startActivity(Intent(this, HomeActivity::class.java))
        }).apply {
            submitList(
                listOf(
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "미도인",
                        ""
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        "강남점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "미도인",
                        "홍대점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        ""
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "미도인",
                        "강남점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        "홍대점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "미도인",
                        ""
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        "강남점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "미도인",
                        "홍대점"
                    )
                )
            )
        }

        binding.rvStore.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        binding.rvStore.addItemDecoration(StoreItemDecorator(this))
    }
}

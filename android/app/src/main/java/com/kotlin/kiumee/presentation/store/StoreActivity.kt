package com.kotlin.kiumee.presentation.store

import android.content.Intent
import androidx.recyclerview.widget.LinearLayoutManager
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityStoreBinding
import com.kotlin.kiumee.presentation.home.HomeActivity
import com.kotlin.kiumee.presentation.login.LoginActivity

class StoreActivity : BindingActivity<ActivityStoreBinding>(R.layout.activity_store) {
    override fun initView() {
        initFormAdapter()
        initHomeBtnClickListener()
    }

    private fun initHomeBtnClickListener() {
        binding.appbarStore.ibLoginHome.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun initFormAdapter() {
        binding.rvStore.adapter = StoreAdapter(click = { store, position ->
            startActivity(Intent(this, HomeActivity::class.java))
        }).apply {
            submitList(
                listOf(
                    Store(
                        "https://lh3.googleusercontent.com/proxy/1QKnsPvJvPd2toUa5no4UUyq4N3zL_5jBcCq1wVF5oeIbNt1AeJMb0VOrO6tRNoWHnELpDT6m2p0JfCzlbYLrKdrAhDLfhWUfJCdTdUtgMBFHIqfUYy6Y5Xf2D9MJukb4ajhBjEpifDvNVED0wAeTf7zJDHbQZ0j_d02c50Fi505WqxbYUCT9-60s16RR_q0xATftQ",
                        "미도인",
                        ""
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        "강남점"
                    ),
                    Store(
                        "https://lh3.googleusercontent.com/proxy/1QKnsPvJvPd2toUa5no4UUyq4N3zL_5jBcCq1wVF5oeIbNt1AeJMb0VOrO6tRNoWHnELpDT6m2p0JfCzlbYLrKdrAhDLfhWUfJCdTdUtgMBFHIqfUYy6Y5Xf2D9MJukb4ajhBjEpifDvNVED0wAeTf7zJDHbQZ0j_d02c50Fi505WqxbYUCT9-60s16RR_q0xATftQ",
                        "미도인",
                        "홍대점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        ""
                    ),
                    Store(
                        "https://lh3.googleusercontent.com/proxy/1QKnsPvJvPd2toUa5no4UUyq4N3zL_5jBcCq1wVF5oeIbNt1AeJMb0VOrO6tRNoWHnELpDT6m2p0JfCzlbYLrKdrAhDLfhWUfJCdTdUtgMBFHIqfUYy6Y5Xf2D9MJukb4ajhBjEpifDvNVED0wAeTf7zJDHbQZ0j_d02c50Fi505WqxbYUCT9-60s16RR_q0xATftQ",
                        "미도인",
                        "강남점"
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        "홍대점"
                    ),
                    Store(
                        "https://lh3.googleusercontent.com/proxy/1QKnsPvJvPd2toUa5no4UUyq4N3zL_5jBcCq1wVF5oeIbNt1AeJMb0VOrO6tRNoWHnELpDT6m2p0JfCzlbYLrKdrAhDLfhWUfJCdTdUtgMBFHIqfUYy6Y5Xf2D9MJukb4ajhBjEpifDvNVED0wAeTf7zJDHbQZ0j_d02c50Fi505WqxbYUCT9-60s16RR_q0xATftQ",
                        "미도인",
                        ""
                    ),
                    Store(
                        "https://www.hecbob.com/img/page/brand/like_logo.png",
                        "핵밥",
                        "강남점"
                    ),
                    Store(
                        "https://lh3.googleusercontent.com/proxy/1QKnsPvJvPd2toUa5no4UUyq4N3zL_5jBcCq1wVF5oeIbNt1AeJMb0VOrO6tRNoWHnELpDT6m2p0JfCzlbYLrKdrAhDLfhWUfJCdTdUtgMBFHIqfUYy6Y5Xf2D9MJukb4ajhBjEpifDvNVED0wAeTf7zJDHbQZ0j_d02c50Fi505WqxbYUCT9-60s16RR_q0xATftQ",
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

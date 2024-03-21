package com.kotlin.kiumee.presentation.menu

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.LinearSmoothScroller
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.tabs.TabLayoutMediator
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityMenuBinding
import com.kotlin.kiumee.presentation.menu.cart.Cart
import com.kotlin.kiumee.presentation.menu.cart.CartAdapter
import com.kotlin.kiumee.presentation.menu.cart.CartItemDecorator
import com.kotlin.kiumee.presentation.menu.chat.Chat
import com.kotlin.kiumee.presentation.menu.chat.ChatAdapter
import com.kotlin.kiumee.presentation.menu.chat.ChatItemDecorator
import com.kotlin.kiumee.presentation.menu.tab.TabAdapter
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishActivity

class MenuActivity : BindingActivity<ActivityMenuBinding>(R.layout.activity_menu) {
    private val smoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }

    override fun initView() {
        initChatAdapter()
        initLayoutState()

        binding.btnMenuRvChat.setOnClickListener {
            binding.rvMenuRvChat?.layoutManager?.startSmoothScroll(
                smoothScroller.apply {
                    targetPosition = 2
                }
            )
        }

        val tabTitles = listOf("직원 호출", "메인 메뉴", "사이드 메뉴", "추가 메뉴", "음료 메뉴", "주류 메뉴")

        val adapter = TabAdapter(supportFragmentManager, lifecycle, tabTitles)
        binding.vpMenu.adapter = adapter

        TabLayoutMediator(binding.layoutMenuTabContent, binding.vpMenu) { tab, position ->
            val customView = LayoutInflater.from(this).inflate(R.layout.item_menu_tab, null)
            val tabText = customView.findViewById<TextView>(R.id.tv_menu_tab)
            tabText.text = tabTitles[position]
            tab.customView = customView
        }.attach()

        binding.vpMenu.isUserInputEnabled = false // 스와이프해서 탭 아이템 넘어가는 것을 허용할 것인지?

        initOrderBtnClickListener()
    }

    private fun initOrderBtnClickListener() {
        binding.btnMenuCartOrder.setOnClickListener {
            startActivity(Intent(this, OrderFinishActivity::class.java))
        }
    }

    private fun initLayoutState() {
        // 추후 코드 변경 필요
        if (true) {
            initCartAdapter()
        } else {
            initEmptyLayout()
        }
    }

    private fun initEmptyLayout() {
        with(binding) {
            rvMenuCart.visibility = View.GONE
            tvMenuCartEmpty.visibility = View.VISIBLE
        }
    }

    private fun initCartAdapter() {
        val cartList = listOf(
            Cart("미도인 스테이크 덮밥", 1, 10500),
            Cart("화산 불백 덮밥", 1, 9500)
        )

        binding.rvMenuCart.adapter = CartAdapter().apply {
            submitList(cartList)
        }

        binding.rvMenuCart.addItemDecoration(CartItemDecorator(this))

        // 카트 목록의 가격 합계 계산
        val totalPrice = cartList.sumOf { it.price }
        binding.tvMenuCartTotalPrice.text = totalPrice.toString() + "원"
    }

    private fun initChatAdapter() {
        binding.rvMenuRvChat.adapter = ChatAdapter().apply {
            submitList(
                listOf(
                    Chat(1, "키우미에게 대화를 시작해주세요!"),
                    Chat(0, "안녕."),
                    Chat(1, "안녕하세요!"),
                    Chat(0, "나는 배가 고파."),
                    Chat(0, "여기에서 가장 잘 나가는 메뉴가 뭐야?"),
                    Chat(1, "저희 매장에서 제일 잘 나가는 메뉴는 아이스 아메리카노입니다.")
                )
            )
        }

        binding.rvMenuRvChat.addItemDecoration(ChatItemDecorator(this))
    }
}

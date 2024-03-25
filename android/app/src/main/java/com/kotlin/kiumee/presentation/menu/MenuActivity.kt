package com.kotlin.kiumee.presentation.menu

import android.content.Intent
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.LinearSmoothScroller
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityMenuBinding
import com.kotlin.kiumee.presentation.menu.cart.Cart
import com.kotlin.kiumee.presentation.menu.cart.CartAdapter
import com.kotlin.kiumee.presentation.menu.cart.CartItemDecorator
import com.kotlin.kiumee.presentation.menu.chat.Chat
import com.kotlin.kiumee.presentation.menu.chat.ChatAdapter
import com.kotlin.kiumee.presentation.menu.chat.ChatItemDecorator
import com.kotlin.kiumee.presentation.menu.menuviewpager.MenuViewPagerAdapter
import com.kotlin.kiumee.presentation.menu.tab.TabAdapter
import com.kotlin.kiumee.presentation.menu.tab.TabItemDecorator
import com.kotlin.kiumee.presentation.menu.tab.TabViewHolder
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishActivity

class MenuActivity : BindingActivity<ActivityMenuBinding>(R.layout.activity_menu) {
    private val smoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }
    private val cartList = mutableListOf<Cart>()
    private var currentPosition = 0
        set(value) {
            field = value
            updateTabSelection()
        }

    override fun initView() {
        initChatAdapter()
        initLayoutState()
        initTabAdapter()

        initMoveRvBtnClickListener()
        initOrderBtnClickListener()
    }

    private fun initTabAdapter() {
        val tabTitles = listOf("직원 호출", "스테이크류", "덮밥류", "면류", "사이드 메뉴", "음료 메뉴", "주류 메뉴")
        with(binding) {
            vpMenu.adapter = MenuViewPagerAdapter(supportFragmentManager, lifecycle, tabTitles)

            rvMenuTabContent.adapter = TabAdapter(click = { tab, position ->
                vpMenu.currentItem = position
                currentPosition = position
            }).apply {
                submitList(tabTitles)
            }

            vpMenu.isUserInputEnabled = false // 스와이프해서 탭 아이템 넘어가는 것을 허용할 것인지?
            rvMenuTabContent.addItemDecoration(TabItemDecorator(this@MenuActivity))
        }
    }

    private fun updateTabSelection() {
        val layoutManager = binding.rvMenuTabContent.layoutManager as LinearLayoutManager
        val itemCount = layoutManager.itemCount
        for (i in 0 until itemCount) {
            val viewHolder = binding.rvMenuTabContent.findViewHolderForAdapterPosition(i)
            if (viewHolder is TabViewHolder) {
                Log.e("ddd", "됨")
                with(viewHolder.binding) {
                    if (i == currentPosition) {
                        selected = true
                        tvMenuTab.setTextAppearance(R.style.TextAppearance_Kiumee_body1_medium_48)
                        viewMenuTab.visibility = View.VISIBLE
                        Log.e("true", "{$i}")
                    } else {
                        selected = false
                        tvMenuTab.setTextAppearance(R.style.TextAppearance_Kiumee_body2_regular_48)
                        viewMenuTab.visibility = View.INVISIBLE
                        Log.e("false", "{$i}")
                    }
                }
            }
        }
    }

    private fun initMoveRvBtnClickListener() {
        binding.btnMenuRvChat.setOnClickListener {
            binding.rvMenuRvChat?.layoutManager?.startSmoothScroll(
                smoothScroller.apply {
                    targetPosition = 2
                }
            )
        }
    }

    private fun initOrderBtnClickListener() {
        binding.btnMenuCartOrder.setOnClickListener {
            if (cartList.isNotEmpty()) {
                startActivity(Intent(this, OrderFinishActivity::class.java))
            }
        }
    }

    private fun initLayoutState() {
        // 추후 코드 변경 필요
        if (cartList.isNotEmpty()) {
            with(binding) {
                rvMenuCart.visibility = View.VISIBLE
                tvMenuCartEmpty.visibility = View.GONE
            }
            initCartAdapter()
        } else {
            initEmptyLayout()
        }
        initCartTotalPrice()
    }

    private fun initEmptyLayout() {
        with(binding) {
            rvMenuCart.visibility = View.GONE
            tvMenuCartEmpty.visibility = View.VISIBLE
        }
    }

    fun addCartItem(cartItem: Cart) {
        // 기존 cartList에 새로운 항목 추가
        cartList.add(cartItem)
        initLayoutState()
    }

    private fun initCartAdapter() {
        val cartAdapter = CartAdapter { cartItem ->
            cartList.remove(cartItem)
            initLayoutState()
        }
        binding.rvMenuCart.adapter = cartAdapter.apply {
            submitList(cartList)
        }

        if (binding.rvMenuCart.itemDecorationCount == 0) {
            binding.rvMenuCart.addItemDecoration(
                CartItemDecorator(this)
            )
        }

        initCartScrollPointer()
    }

    private fun initCartScrollPointer() {
        binding.rvMenuCart?.layoutManager?.startSmoothScroll(
            smoothScroller.apply {
                targetPosition = cartList.size - 1
            }
        )
    }

    private fun initCartTotalPrice() {
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

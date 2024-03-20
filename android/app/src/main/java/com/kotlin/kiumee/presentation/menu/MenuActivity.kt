package com.kotlin.kiumee.presentation.menu

import android.content.Intent
import androidx.recyclerview.widget.LinearSmoothScroller
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityMenuBinding
import com.kotlin.kiumee.presentation.menu.chat.Chat
import com.kotlin.kiumee.presentation.menu.chat.ChatAdapter
import com.kotlin.kiumee.presentation.menu.chat.ChatItemDecoration
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishActivity

class MenuActivity : BindingActivity<ActivityMenuBinding>(R.layout.activity_menu) {
    private val smoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }

    override fun initView() {
        initChatAdapter()

        binding.btn.setOnClickListener {
            binding.rvChat?.layoutManager?.startSmoothScroll(
                smoothScroller.apply {
                    targetPosition = 2
                }
            )
        }

        // initTabPager()
        initOrderBtnClickListener()
    }

    //    private fun initTabPager() {
//        val tabLayout = binding.layoutFragmentMenuSelectTab
//        val viewPager = binding.vpMenuSelect
//
//        val menuTabAdapter = MenuSelectAdapter(this)
//        viewPager.adapter = menuTabAdapter
//
//        val tabs = listOf(
//            "커피(HOT)",
//            "커피(ICE)",
//            "에이드&티",
//            "음료",
//            "디저트"
//        )
//
//        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
//            tab.text = tabs[position]
//        }.attach()
//    }

    private fun initOrderBtnClickListener() {
        binding.btnMenuCartOrder.setOnClickListener {
            startActivity(Intent(this, OrderFinishActivity::class.java))
        }
    }

    private fun initChatAdapter() {
        binding.rvChat.adapter = ChatAdapter().apply {
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

        binding.rvChat.addItemDecoration(ChatItemDecoration(this))
    }
}

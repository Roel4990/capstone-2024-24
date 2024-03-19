package com.kotlin.kiumee.presentation.chat

import androidx.recyclerview.widget.LinearSmoothScroller
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityChatBinding
import com.kotlin.kiumee.presentation.orderselect.OrderSelectFragment

class ChatActivity : BindingActivity<ActivityChatBinding>(R.layout.activity_chat) {
    private val smoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }

    override fun initView() {
        initChatAdapter()
        initActivityFragment()

        binding.btn.setOnClickListener {
            binding.rvChat?.layoutManager?.startSmoothScroll(
                smoothScroller.apply {
                    targetPosition = 2
                }
            )
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

    private fun initActivityFragment() {
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.fcv_chat, OrderSelectFragment())
            commit()
        }
    }
}

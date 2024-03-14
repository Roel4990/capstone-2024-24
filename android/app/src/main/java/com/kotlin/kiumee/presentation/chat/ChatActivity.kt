package com.kotlin.kiumee.presentation.chat

import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.databinding.ActivityChatBinding
import com.kotlin.kiumee.presentation.orderselect.OrderSelectFragment

class ChatActivity : BindingActivity<ActivityChatBinding>(R.layout.activity_chat) {
    override fun initView() {
        initChatAdapter()
        initActivityFragment()
    }

    private fun initChatAdapter() {
        binding.rvChat.adapter = ChatAdapter().apply {
            submitList(
                listOf(
                    Chat(1, "키우미에게 대화를 시작해주세요!"),
                    Chat(0, "안녕."),
                    Chat(1, "안녕하세요!"),
                    Chat(0, "여기에서 가장 잘 나가는 메뉴가 뭐야?"),
                    Chat(1, "저희 매장에서 제일 잘 나가는 메뉴는 아이스 아메리카노입니다."),
                )
            )
        }
    }

    private fun initActivityFragment() {
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.fcv_chat, OrderSelectFragment())
            commit()
        }
    }
}

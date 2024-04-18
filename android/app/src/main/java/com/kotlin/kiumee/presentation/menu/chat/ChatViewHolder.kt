package com.kotlin.kiumee.presentation.menu.chat

import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.util.context.colorOf
import com.kotlin.kiumee.databinding.ItemChatBinding
import com.kotlin.kiumee.presentation.menu.chat.menubtn.MenuBtnAdapter
import com.kotlin.kiumee.presentation.menu.chat.menubtn.MenuBtnItemDecorator

class ChatViewHolder(private val binding: ItemChatBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: Chat) {
        with(binding) {
            chat = data

            if (data.type == 0) { // 본인 채팅
                layoutItemChatBackground.setBackgroundResource(R.drawable.shape_secondary_fill_start_bottom_30_rect)
                layoutItemChat.gravity = Gravity.END
                tvItemChat.setTextColor(root.context.colorOf(R.color.white))
            } else if (data.type == 1) { // 상대 채팅
                layoutItemChatBackground.setBackgroundResource(R.drawable.shape_gray3_fill_end_bottom_30_rect)
                layoutItemChat.gravity = Gravity.START
                tvItemChat.setTextColor(root.context.colorOf(R.color.black))
            }

            if (data.button != null) {
                rvItemChatBtn.visibility = View.VISIBLE

                val layoutParams = layoutItemChatBackground.layoutParams
                layoutParams.width = ViewGroup.LayoutParams.MATCH_PARENT
                layoutItemChatBackground.layoutParams = layoutParams

                rvItemChatBtn.apply {
                    adapter = MenuBtnAdapter().apply { submitList(data.button) }
                    layoutManager = LinearLayoutManager(
                        binding.rvItemChatBtn.context,
                        LinearLayoutManager.HORIZONTAL,
                        false
                    )
                    addItemDecoration(MenuBtnItemDecorator(context))
                }
            } else {
                rvItemChatBtn.visibility = View.GONE
            }
        }
    }
}

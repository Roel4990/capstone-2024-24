package com.kotlin.kiumee.presentation.chat

import android.view.Gravity
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.databinding.ItemChatBinding

class ChatViewHolder(private val binding: ItemChatBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: Chat) {
        with(binding) {
            chat = data

            if (data.type == 0) { // 본인 채팅
                tvItemChat.setBackgroundResource(R.drawable.shape_secondary_fill_start_bottom_20_rect)
                layoutItemChat.gravity = Gravity.END
            } else if (data.type == 1) { // 상대 채팅
                tvItemChat.setBackgroundResource(R.drawable.shape_gray3_fill_end_bottom_20_rect)
                layoutItemChat.gravity = Gravity.START
            }
        }
    }
}

package com.kotlin.kiumee.presentation.menu.chat

import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemChatJumiBinding
import com.kotlin.kiumee.databinding.ItemChatUserBinding
import com.kotlin.kiumee.presentation.menu.chat.menubtn.MenuBtnAdapter

class ChatJumiViewHolder(private val binding: ItemChatJumiBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: Chat) {
        with(binding) {
            chat = data

            if (data.button != null) {
                rvItemChatJumiBtn.visibility = View.VISIBLE

                val layoutParams = layoutItemChatJumiBackground.layoutParams
                layoutParams.width = ViewGroup.LayoutParams.MATCH_PARENT
                layoutItemChatJumiBackground.layoutParams = layoutParams

                rvItemChatJumiBtn.apply {
                    adapter = MenuBtnAdapter().apply { submitList(data.button) }
                    layoutManager = LinearLayoutManager(
                        binding.rvItemChatJumiBtn.context,
                        LinearLayoutManager.HORIZONTAL,
                        false
                    )
                }
            } else {
                rvItemChatJumiBtn.visibility = View.GONE
            }
        }
    }
}

class ChatUserViewHolder(private val binding: ItemChatUserBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: Chat) {
        binding.chat = data
    }
}

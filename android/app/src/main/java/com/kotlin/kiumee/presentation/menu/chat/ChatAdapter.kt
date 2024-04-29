package com.kotlin.kiumee.presentation.menu.chat

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemChatJumiBinding
import com.kotlin.kiumee.databinding.ItemChatUserBinding
import com.kotlin.kiumee.presentation.menu.chat.Chat.Companion.VIEW_TYPE_JUMI
import com.kotlin.kiumee.presentation.menu.chat.Chat.Companion.VIEW_TYPE_USER

class ChatAdapter() : ListAdapter<Chat, RecyclerView.ViewHolder>(ChatAdapterDiffCallback) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): RecyclerView.ViewHolder {
        return when (viewType) {
            VIEW_TYPE_JUMI -> {
                val binding =
                    ItemChatJumiBinding.inflate(LayoutInflater.from(parent.context), parent, false)
                ChatJumiViewHolder(binding)
            }

            VIEW_TYPE_USER -> {
                val binding =
                    ItemChatUserBinding.inflate(LayoutInflater.from(parent.context), parent, false)
                ChatUserViewHolder(binding)
            }

            else -> throw RuntimeException("알 수 없는 채팅 뷰 타입")
        }
    }

    override fun onBindViewHolder(
        holder: RecyclerView.ViewHolder,
        position: Int
    ) {
        when (currentList[position].viewType) {
            VIEW_TYPE_JUMI -> (holder as ChatJumiViewHolder).bind(currentList[position])
            VIEW_TYPE_USER -> (holder as ChatUserViewHolder).bind(currentList[position])
            else -> throw RuntimeException("알 수 없는 채팅 뷰 타입")
        }
    }

    override fun getItemViewType(position: Int): Int {
        return currentList[position].viewType
    }

    companion object {
        private val ChatAdapterDiffCallback =
            ItemDiffCallback<Chat>(
                // 추후 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }
}

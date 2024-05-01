package com.kotlin.kiumee.presentation.menu.chat.guidebtn

import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemChatGuideBinding

class GuideBtnViewHolder(private val binding: ItemChatGuideBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: String) {
        with(binding) {
            tvItemChatGuide.text = data
        }
    }
}

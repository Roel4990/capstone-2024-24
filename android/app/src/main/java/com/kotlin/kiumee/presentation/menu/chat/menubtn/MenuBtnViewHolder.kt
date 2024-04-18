package com.kotlin.kiumee.presentation.menu.chat.menubtn

import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemChatBtnBinding

class MenuBtnViewHolder(private val binding: ItemChatBtnBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: String) {
        with(binding) {
            tvItemChatBtnName.text = data
            tvItemChatBtnPrice.text = data
        }
    }
}

package com.kotlin.kiumee.presentation.menu.chat.menubtn

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemChatBtnBinding

class MenuBtnAdapter() : ListAdapter<String, MenuBtnViewHolder>(MenuBtnAdapterDiffCallback) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): MenuBtnViewHolder {
        val binding =
            ItemChatBtnBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return MenuBtnViewHolder(binding)
    }

    override fun onBindViewHolder(
        holder: MenuBtnViewHolder,
        position: Int
    ) {
        holder.bind(currentList[position])
    }

    companion object {
        private val MenuBtnAdapterDiffCallback =
            ItemDiffCallback<String>(
                // 추후 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }
}

package com.kotlin.kiumee.presentation.menu.chat.guidebtn

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemChatGuideBinding

class GuideBtnAdapter() : ListAdapter<String, GuideBtnViewHolder>(GuideBtnAdapterDiffCallback) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): GuideBtnViewHolder {
        val binding =
            ItemChatGuideBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return GuideBtnViewHolder(binding)
    }

    override fun onBindViewHolder(
        holder: GuideBtnViewHolder,
        position: Int
    ) {
        holder.bind(currentList[position])
    }

    companion object {
        private val GuideBtnAdapterDiffCallback =
            ItemDiffCallback<String>(
                // 추후 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }
}

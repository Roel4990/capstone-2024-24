package com.kotlin.kiumee.presentation.menu.tab

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemMenuTabBinding

class TabAdapter(
    private val click: (String, Int) -> Unit = { _, _ -> },
) :
    ListAdapter<String, TabViewHolder>(
        TabAdapterDiffCallback
    ) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): TabViewHolder {
        val binding =
            ItemMenuTabBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return TabViewHolder(binding, click)
    }

    override fun onBindViewHolder(
        holder: TabViewHolder,
        position: Int
    ) {
        holder.bind(currentList[position])
    }

    companion object {
        private val TabAdapterDiffCallback =
            ItemDiffCallback<String>(
                // 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }
}

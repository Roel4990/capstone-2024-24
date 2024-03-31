package com.kotlin.kiumee.presentation.store

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemStoreBinding

class StoreAdapter(
    private val click: (Store, Int) -> Unit = { _, _ -> }
) :
    ListAdapter<Store, StoreViewHolder>(
        StoreAdapterDiffCallback
    ) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): StoreViewHolder {
        val binding =
            ItemStoreBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return StoreViewHolder(binding, click)
    }

    override fun onBindViewHolder(
        holder: StoreViewHolder,
        position: Int
    ) {
        holder.bind(currentList[position])
    }

    companion object {
        private val StoreAdapterDiffCallback =
            ItemDiffCallback<Store>(
                // 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }
}

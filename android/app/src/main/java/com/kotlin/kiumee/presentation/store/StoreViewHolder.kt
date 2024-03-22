package com.kotlin.kiumee.presentation.store

import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.kotlin.kiumee.databinding.ItemStoreBinding

class StoreViewHolder(
    private val binding: ItemStoreBinding,
    private val click: (Store, Int) -> Unit = { _, _ -> }
) : RecyclerView.ViewHolder(binding.root) {
    fun bind(data: Store) {
        with(binding) {
            Glide.with(root.context).load(data.imageUrl).centerCrop().into(ivItemStore)
            tvItemStoreName.text = data.name
            tvItemStoreDescription.text = data.description

            root.setOnClickListener {
                click(data, adapterPosition)
            }
        }
    }
}

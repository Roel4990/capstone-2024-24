package com.kotlin.kiumee.presentation.menu

import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.kotlin.kiumee.databinding.ItemMenuBinding

class MenuViewHolder(
    private val binding: ItemMenuBinding,
    private val click: (Menu, Int) -> Unit = { _, _ -> }
) : RecyclerView.ViewHolder(binding.root) {
    fun bind(data: Menu) {
        with(binding) {
            Glide.with(root.context).load(data.imageUrl).centerCrop().into(binding.ivItemMenu)
            tvItemMenuName.text = data.name
            tvItemMenuPrice.text = data.price.toString() + "원"
            tvItemMenuDescription.text = data.description

            root.setOnClickListener {
                click(data, adapterPosition)
            }
        }
    }
}

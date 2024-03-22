package com.kotlin.kiumee.presentation.menu.tab

import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemMenuTabBinding

class TabViewHolder(
    val binding: ItemMenuTabBinding,
    private val click: (String, Int) -> Unit = { _, _ -> }
) : RecyclerView.ViewHolder(binding.root) {
    fun bind(data: String) {
        with(binding) {
            tvMenuTab.text = data

            root.setOnClickListener {
                click(data, adapterPosition)
            }
        }
    }
}

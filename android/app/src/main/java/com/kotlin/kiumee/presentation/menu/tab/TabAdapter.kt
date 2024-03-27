package com.kotlin.kiumee.presentation.menu.tab

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.util.context.colorOf
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemMenuTabBinding

class TabAdapter(
    private val click: (String, Int) -> Unit = { _, _ -> }
) :
    ListAdapter<String, TabAdapter.TabViewHolder>(
        TabAdapterDiffCallback
    ) {
    private var selectedTabIndex: Int = 0 // 초기에는 첫 번째 탭을 선택

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

    @SuppressLint("NotifyDataSetChanged")
    fun setSelectedTab(position: Int) {
        selectedTabIndex = position
        notifyDataSetChanged() // 선택된 탭을 갱신하기 위해 RecyclerView를 다시 그리도록 함
    }

    companion object {
        private val TabAdapterDiffCallback =
            ItemDiffCallback<String>(
                // 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }

    inner class TabViewHolder(
        private val binding: ItemMenuTabBinding,
        private val click: (String, Int) -> Unit
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(data: String) {
            with(binding) {
                tvMenuTab.text = data

                root.setOnClickListener {
                    click(data, adapterPosition)
                    setSelectedTab(adapterPosition) // 클릭된 탭의 위치를 설정
                }

                if (adapterPosition == selectedTabIndex) {
                    tvMenuTab.setTextAppearance(R.style.TextAppearance_Kiumee_body1_medium_48)
                    viewMenuTab.visibility = View.VISIBLE
                    tvMenuTab.setTextColor(root.context.colorOf(R.color.primary))
                } else {
                    tvMenuTab.setTextAppearance(R.style.TextAppearance_Kiumee_body2_regular_48)
                    viewMenuTab.visibility = View.INVISIBLE
                    tvMenuTab.setTextColor(root.context.colorOf(R.color.black))
                }
            }
        }
    }
}

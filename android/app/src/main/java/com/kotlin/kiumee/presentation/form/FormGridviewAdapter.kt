package com.kotlin.kiumee.presentation.form

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.kotlin.kiumee.R

class FormGridviewAdapter(
    private val context: Context,
    private val storeList: MutableList<Store>
) : BaseAdapter() {
    var onItemClick: ((store: Store) -> Unit)? = null

    override fun getCount(): Int {
        return storeList.size
    }

    override fun getItem(position: Int): Any {
        return storeList[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var convertView = convertView
        if (convertView == null) convertView =
            LayoutInflater.from(parent?.context).inflate(R.layout.item_form, parent, false)

        val item: Store = storeList[position]

        val formImage = convertView?.findViewById<View>(R.id.iv_item_form) as ImageView
        val formName = convertView?.findViewById<View>(R.id.tv_item_form_name) as TextView
        val formDescription =
            convertView?.findViewById<View>(R.id.tv_item_form_description) as TextView

        Glide.with(context).load(item.imageUrl).into(formImage)
        formName.text = item.name
        formDescription.text = item.description

        convertView.setOnClickListener {
            onItemClick?.invoke(item)
        }

        return convertView
    }
}

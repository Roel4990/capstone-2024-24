package com.kotlin.kiumee.presentation.menu

import android.content.Intent
import android.speech.tts.TextToSpeech
import android.view.View
import androidx.activity.viewModels
import androidx.core.view.get
import androidx.lifecycle.flowWithLifecycle
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.LinearSmoothScroller
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.data.dto.request.RequestPromptDto
import com.kotlin.kiumee.data.dto.request.RequestPromptOrderInfoDto
import com.kotlin.kiumee.data.dto.request.RequestPromptOrderInfoItemsDto
import com.kotlin.kiumee.databinding.ActivityMenuBinding
import com.kotlin.kiumee.presentation.menu.cart.CartAdapter
import com.kotlin.kiumee.presentation.menu.cart.CartEntity
import com.kotlin.kiumee.presentation.menu.cart.CartItemDecorator
import com.kotlin.kiumee.presentation.menu.chat.ChatAdapter
import com.kotlin.kiumee.presentation.menu.chat.ChatEntity
import com.kotlin.kiumee.presentation.menu.chat.ChatEntity.Companion.VIEW_TYPE_JUMI
import com.kotlin.kiumee.presentation.menu.chat.ChatEntity.Companion.VIEW_TYPE_USER
import com.kotlin.kiumee.presentation.menu.chat.ChatItemDecorator
import com.kotlin.kiumee.presentation.menu.chat.guidebtn.GuideBtnAdapter
import com.kotlin.kiumee.presentation.menu.chat.guidebtn.GuideBtnEntity
import com.kotlin.kiumee.presentation.menu.chat.guidebtn.GuideBtnItemDecorator
import com.kotlin.kiumee.presentation.menu.menuviewpager.MenuViewPagerAdapter
import com.kotlin.kiumee.presentation.menu.tab.TabAdapter
import com.kotlin.kiumee.presentation.menu.tab.TabItemDecorator
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishActivity
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import timber.log.Timber
import java.util.Locale

class MenuActivity : BindingActivity<ActivityMenuBinding>(R.layout.activity_menu) {
    private val menuViewModel by viewModels<MenuViewModel>()
    private val cartSmoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }
    private val chatSmoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }
    private val tabSmoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }
    private var tts: TextToSpeech? = null

    private val cartList = mutableListOf<CartEntity>()
    var clicked = false
    private var lastClickedPosition: Int = 0
    private val chatList = mutableListOf(
        ChatEntity(
            viewType = VIEW_TYPE_JUMI,
            content = "주미에게 버튼을 눌러 대화를 걸어보세요."
        )
    )

    override fun initView() {
        initTextToSpeech()
        initChatAdapter(VIEW_TYPE_USER)
        initCartLayoutState()

        SocketClient.connect(this)
        SocketClient.cnt = 0

        initObserveGetMenu()
        initObservePostPrompt()
        initObserveGetPrompts()
        initObservePutBilling()

        initOrderBtnClickListener()
        initSpeakBtnClickListener()
        initCloseBtnClickListener()
    }

    private fun initTextToSpeech() {
        tts = TextToSpeech(
            this,
            TextToSpeech.OnInitListener {
                if (it == TextToSpeech.SUCCESS) {
                    val result = tts?.setLanguage(Locale.KOREAN)
                    if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                        Timber.tag("tts").e("해당 언어는 지원되지 않습니다.")
                        return@OnInitListener
                    }
                    Timber.tag("tts").e("TTS 세팅 성공!")
                } else {
                    Timber.tag("tts").e("TTS 초기화 실패")
                }
            }
        )
    }

    private fun runTextToSpeech(string: String) {
        tts?.speak(string, TextToSpeech.QUEUE_ADD, null, null)
        // tts?.playSilentUtterance(750, TextToSpeech.QUEUE_ADD, null) // deley 시간 설정
    }

    private fun initObserveGetPrompts() {
        menuViewModel.getPrompts.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> initGuideBtnAdapter(it.data)
                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> Timber.d("로딩중")
                is UiState.Empty -> Timber.d("empty")
            }
        }.launchIn(lifecycleScope)
    }

    private fun initObservePostPrompt() {
        menuViewModel.postPrompt.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> {
                    addChatItem(it.data)
                    binding.rvMenuChatGuide.isClickable = true
                }

                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> {
                    Timber.d("로딩중")
                    binding.rvMenuChatGuide.isClickable = false
                }

                is UiState.Empty -> Timber.d("empty")
            }
        }.launchIn(lifecycleScope)
    }

    fun addChatItem(chatItem: ChatEntity) {
        runOnUiThread {
            if (chatItem.viewType == VIEW_TYPE_USER) {
                menuViewModel.postPrompt(
                    RequestPromptDto(
                        chatItem.content,
                        if (cartList.isEmpty()) {
                            // cartList가 비어있는 경우 빈 목록 대신에 하나의 기본값을 가지는 목록을 생성
                            RequestPromptOrderInfoDto(
                                listOf(RequestPromptOrderInfoItemsDto(id = 0, quantity = 0))
                            )
                        } else {
                            // cartList가 비어있지 않은 경우 해당 목록을 변환하여 사용
                            RequestPromptOrderInfoDto(
                                cartList.map { it.toRequestPromptOrderInfoItemsDto() }
                            )
                        }
                    )
                )
                // 기존 chatList에 새로운 항목 추가
                chatList.add(chatItem)
                initChatAdapter(VIEW_TYPE_USER)
            } else {
                // 기존 chatList에 새로운 항목 추가
                chatList.add(chatItem)
                // binding.rvMenuChat.adapter?.notifyItemInserted(chatList.size - 1)
                // initChatScrollPointer()
                initChatAdapter(VIEW_TYPE_JUMI)
                runTextToSpeech(chatItem.content)
            }
        }
    }

    private fun initSpeakBtnClickListener() {
        binding.btnMenuSpeak.setOnClickListener {
            if (!clicked) {
                setupSpeakOn()
            } else {
                setupSpeakOff()
            }
        }
    }

    private fun setupSpeakOn() {
        clicked = true

        with(binding) {
            btnMenuSpeak.setBackgroundResource(R.drawable.shape_secondary_fill_circle)
            btnMenuSpeak.text = "대화\n끄기"

            avMenuAudio.visibility = View.VISIBLE
            avMenuAudio.playAnimation()
        }

        val intent = Intent(this, VoiceInput::class.java)
        startService(intent)
    }

    private fun setupSpeakOff() {
        clicked = false

        with(binding) {
            btnMenuSpeak.setBackgroundResource(R.drawable.shape_point_fill_circle)
            btnMenuSpeak.text = "대화\n켜기"

            avMenuAudio.visibility = View.GONE
        }

        val intent = Intent(this, VoiceInput::class.java)
        stopService(intent)
    }

    private fun initObserveGetMenu() {
        menuViewModel.getMenu.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> initTabAdapter(it.data)
                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> Timber.d("로딩중")
                is UiState.Empty -> Timber.d("empty")
            }
        }.launchIn(lifecycleScope)
    }

    private fun initTabAdapter(tabData: List<CategoryEntity>) {
        with(binding) {
            vpMenuMenu.adapter = MenuViewPagerAdapter(supportFragmentManager, lifecycle, tabData)
            rvMenuTabContent.adapter = TabAdapter(click = { _, position ->
                layoutMenuMenu.visibility = View.VISIBLE
                layoutMenuChat.visibility = View.GONE
                lastClickedPosition = position
                vpMenuMenu.adapter =
                    MenuViewPagerAdapter(supportFragmentManager, lifecycle, tabData)
                vpMenuMenu.currentItem = position
            }).apply {
                submitList(tabData)
            }

            vpMenuMenu.isUserInputEnabled = false // 스와이프해서 탭 아이템 넘어가는 것을 허용할 것인지?
            rvMenuTabContent.addItemDecoration(TabItemDecorator(this@MenuActivity))
        }
    }

    private fun initCloseBtnClickListener() {
        binding.tvMenuMenuClose.setOnClickListener {
            binding.layoutMenuMenu.visibility = View.GONE
            binding.layoutMenuChat.visibility = View.VISIBLE
        }
    }

    private fun initOrderBtnClickListener() {
        binding.btnMenuCartOrder.setOnClickListener {
            if (cartList.isNotEmpty()) {
                cartList.map { it.toRequestBillingItemsDto() }.let { menuViewModel.putBilling(it) }
            }
        }
    }

    private fun initObservePutBilling() {
        menuViewModel.putBilling.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> {
                    if (clicked) {
                        setupSpeakOff()
                    }
                    SocketClient.disconnect()
                    startActivity(Intent(this, OrderFinishActivity::class.java))
                }

                is UiState.Failure -> Unit
                is UiState.Empty -> Unit
                is UiState.Loading -> Unit
            }
        }.launchIn(lifecycleScope)
    }

    private fun initCartLayoutState() {
        if (cartList.isNotEmpty()) {
            with(binding) {
                rvMenuCart.visibility = View.VISIBLE
                tvMenuCartEmpty.visibility = View.GONE
            }
            initCartAdapter()
        } else {
            initEmptyLayout()
        }
        initCartTotalPrice()
    }

    private fun initEmptyLayout() {
        with(binding) {
            rvMenuCart.visibility = View.GONE
            tvMenuCartEmpty.visibility = View.VISIBLE
        }
    }

    fun addCartItem(cartItem: CartEntity) {
        // 기존 cartList에 새로운 항목 추가
        cartList.add(cartItem)
        initCartLayoutState()
    }

    private fun initCartAdapter() {
        val cartAdapter = CartAdapter { cartItem ->
            cartList.remove(cartItem)
            initCartLayoutState()
        }
        binding.rvMenuCart.adapter = cartAdapter.apply {
            submitList(cartList)
        }

        if (binding.rvMenuCart.itemDecorationCount == 0) {
            binding.rvMenuCart.addItemDecoration(
                CartItemDecorator(this)
            )
        }

        initCartScrollPointer()
    }

    private fun initCartScrollPointer() {
        binding.rvMenuCart.layoutManager?.startSmoothScroll(
            cartSmoothScroller.apply {
                targetPosition = cartList.size - 1
            }
        )
    }

    private fun initCartTotalPrice() {
        // 카트 목록의 가격 합계 계산
        val totalPrice = cartList.sumOf { it.price }
        binding.tvMenuCartTotalPrice.text = "${totalPrice}원"
    }

    private fun initGuideBtnAdapter(data: List<GuideBtnEntity>) {
        Timber.tag("aaa").d(data.toString())
        with(binding) {
            rvMenuChatGuide.adapter = GuideBtnAdapter(click = { guideBtnData, position ->
                addChatItem(ChatEntity(VIEW_TYPE_USER, guideBtnData))
            }).apply {
                submitList(data)
            }
            rvMenuChatGuide.layoutManager =
                LinearLayoutManager(
                    rvMenuChatGuide.context,
                    LinearLayoutManager.HORIZONTAL,
                    false
                )
            rvMenuChatGuide.addItemDecoration(GuideBtnItemDecorator(this@MenuActivity))
        }
    }

    private fun setCartCompareToOrderInfo(orderInfo: List<CartEntity>) {
        if (cartList != orderInfo) {
            cartList.clear()
            cartList.addAll(orderInfo)
            initCartLayoutState()
        }
    }

    private fun setTabScrollToPosition(position: Int) {
        with(binding) {
            val itemCount = rvMenuTabContent.adapter?.itemCount ?: 0
            if (position in 0 until itemCount) {
                rvMenuTabContent?.layoutManager?.startSmoothScroll(
                    tabSmoothScroller.apply {
                        targetPosition = position
                    }
                )
                rvMenuTabContent[position].performClick()
                lastClickedPosition = position
                layoutMenuMenu.visibility = View.VISIBLE
                layoutMenuChat.visibility = View.GONE
            } else {
                // position이 유효한 범위를 벗어나면 에러 처리 또는 다른 동작 수행
                // 예를 들어, 에러 로그를 출력하거나 기본 위치로 스크롤을 이동할 수 있음
                Timber.e("Invalid position: $position, itemCount: $itemCount")
            }
        }
    }

    private fun initChatAdapter(chatType: Int) {
        binding.rvMenuChat.adapter = ChatAdapter(
            orderInfoCompareToCart = { orderInfo ->
                setCartCompareToOrderInfo(orderInfo)
            },
            tabScrollToPosition = { position ->
                if (chatType == VIEW_TYPE_JUMI) {
                    setTabScrollToPosition(position)
                }
            },
            orderBtnClickListener = {
                if (cartList.isNotEmpty()) {
                    cartList.map { it.toRequestBillingItemsDto() }
                        .let { menuViewModel.putBilling(it) }
                }
            }
        ).apply {
            submitList(chatList)
        }

        if (binding.rvMenuChat.itemDecorationCount == 0) {
            binding.rvMenuChat.addItemDecoration(
                ChatItemDecorator(this)
            )
        }

        initChatScrollPointer()
    }

    private fun initChatScrollPointer() {
        binding.rvMenuChat.post {
            val newPosition = chatList.size
            Timber.tag("scroll").d(newPosition.toString())

            binding.rvMenuChat.layoutManager?.startSmoothScroll(
                chatSmoothScroller.apply {
                    targetPosition = newPosition
                }
            )
        }
    }

    fun getLastClickedPosition(): Int {
        return lastClickedPosition
    }
}

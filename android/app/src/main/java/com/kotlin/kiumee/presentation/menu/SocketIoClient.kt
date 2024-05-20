package com.kotlin.kiumee.presentation.menu

import com.kotlin.kiumee.BuildConfig.SOCKET_URL
import com.kotlin.kiumee.presentation.menu.chat.ChatEntity
import com.kotlin.kiumee.presentation.menu.chat.ChatEntity.Companion.VIEW_TYPE_USER
import io.socket.client.IO
import io.socket.client.Socket
import org.json.JSONObject
import timber.log.Timber
import java.net.URI

object SocketIoClient {
    private lateinit var socket: Socket
    private lateinit var menuActivity: MenuActivity
    var cnt = 0

    fun connect(activity: MenuActivity) {
        try {
            menuActivity = activity

            val uri = URI.create(SOCKET_URL)
            val options = IO.Options().apply {
                transports = arrayOf("websocket")
                timeout = -1
            }

            socket = IO.socket(uri, options)
            socket.connect()

            socket.on(Socket.EVENT_CONNECT) {
                // 소켓 서버에 연결이 성공하면 호출
                Timber.tag("voice").d("Socket connected")
            }.on(Socket.EVENT_DISCONNECT) { args ->
                // 소켓 서버 연결이 끊어질 경우에 호출
                Timber.tag("voice").d("Socket disconnected: ${args[0]}")
            }.on(Socket.EVENT_CONNECT_ERROR) { args ->
                // 소켓 서버 연결 시 오류가 발생할 경우에 호출
                val errorMessage =
                    if (args.isNotEmpty()) args[0].toString() else "Unknown error"
                Timber.tag("voice").d("Socket connection error: $errorMessage")
            }.on("response") { args ->
                val data = args[0] as JSONObject
                Timber.tag("voice").d("서버로부터 받은 데이터 : $data")

//                if (cnt == 0) {
//                    Timber.tag("voice").d("서버로부터 받은 데이터 확인용 : ${data.getString("text")}")
//                    menuActivity.addChatItem(ChatEntity(VIEW_TYPE_USER, data.getString("text")))
//                }
//                cnt++

                Timber.tag("voice").d("서버로부터 받은 데이터 확인용 : ${data.getString("text")}")
                menuActivity.addChatItem(ChatEntity(VIEW_TYPE_USER, data.getString("text")))
            }
        } catch (e: Exception) {
            Timber.tag("voice").e("socket 연결부터 에러 : ${e.message}")
            e.printStackTrace()
        }
    }

    fun sendAudio(audioData: ByteArray, sampleRate: Int) {
        socket.emit(
            "audio",
            JSONObject().apply {
                put("audio", audioData)
                put("sample_rate", sampleRate)
            }
        )
    }

    fun disconnect() {
        Timber.tag("voice").d("Socket disconnect")
        socket.disconnect()
        socket.off()
    }
}

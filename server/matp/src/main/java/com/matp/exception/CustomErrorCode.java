package com.matp.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode {
    UPLOAD_FAILED(HttpStatus.NOT_FOUND,"잘못된 형식의 파일입니다."),
    NO_IMAGE(HttpStatus.NO_CONTENT, "해당 이미지를 찾을 수 없습니다."),
    POST_NOT_FOUND(HttpStatus.NO_CONTENT, "해당 게시글을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}

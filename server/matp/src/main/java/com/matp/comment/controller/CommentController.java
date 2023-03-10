package com.matp.comment.controller;

import com.matp.comment.dto.CommentInfo;
import com.matp.comment.dto.CommentRequest;
import com.matp.comment.dto.CommentResponse;
import com.matp.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/places/{place-id}/posts/{post-id}/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public Mono<ResponseEntity<CommentResponse>> createComment(@Validated @RequestBody Mono<CommentRequest> request,
                                                               @PathVariable("post-id")Long postId) {
        Mono<ResponseEntity<CommentResponse>> map = request
                .flatMap(CommentRequest -> commentService.save(CommentRequest,postId))
                .map(commentResponse -> new ResponseEntity<>(commentResponse, HttpStatus.CREATED));
        return map;
    }
    @PatchMapping("/{comment-id}")
    public Mono<ResponseEntity<CommentResponse>> updateComment(@Validated @RequestBody Mono<CommentRequest> request,
                                                               @PathVariable("post-id") Long postId,
                                                               @PathVariable("comment-id") Long commentId) {
        return request.flatMap(postCommentRequest -> commentService.updateComment(postCommentRequest, postId, commentId))
                .map(commentResponse -> new ResponseEntity<>(commentResponse, HttpStatus.OK));
    }

    @DeleteMapping("/{comment-id}")
    public Mono<ResponseEntity<Void>> deleteComment(@PathVariable("comment-id") Long commentId) {

        return commentService.deleteComment(commentId)
                .map(response -> ResponseEntity.noContent().<Void>build())
                .switchIfEmpty(Mono.just(new ResponseEntity<>(HttpStatus.NO_CONTENT)));
    }

    //TODO ?????? ???????????? ????????? ?????? ( ????????? ?????? )
    @GetMapping("/comment-reload")
    public Mono<ResponseEntity<List<CommentInfo>>> reloadComments(@PathVariable("post-id")Long postId) {
        return commentService.getComments(postId)
                .map(commentInfos -> new ResponseEntity<>(commentInfos,HttpStatus.OK));
    }
}

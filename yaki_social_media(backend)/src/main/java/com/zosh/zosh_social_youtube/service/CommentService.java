package com.zosh.zosh_social_youtube.service;

import com.zosh.zosh_social_youtube.dto.request.CommentRequest;
import com.zosh.zosh_social_youtube.dto.request.PostUpdateRequest;
import com.zosh.zosh_social_youtube.dto.response.CommentResponse;
import com.zosh.zosh_social_youtube.dto.response.PostResponse;
import com.zosh.zosh_social_youtube.entity.Comment;
import com.zosh.zosh_social_youtube.entity.Post;
import com.zosh.zosh_social_youtube.entity.SavedPost;
import com.zosh.zosh_social_youtube.entity.User;
import com.zosh.zosh_social_youtube.exception.AppException;
import com.zosh.zosh_social_youtube.exception.ErrorCode;
import com.zosh.zosh_social_youtube.mapper.CommentMapper;
import com.zosh.zosh_social_youtube.repository.CommentRepository;
import com.zosh.zosh_social_youtube.repository.PostRepository;
import com.zosh.zosh_social_youtube.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper; // Mapper để chuyển từ entity sang response

    @Transactional
    public CommentResponse createComment(CommentRequest request) {

        // Kiểm tra dữ liệu đầu vào
        if (request.getUserId() == null || request.getPostId() == null || request.getContent() == null) {
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        // Lấy user từ request
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Lấy bài viết mà comment thuộc về
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));

        // Tạo comment mới
        Comment comment = Comment.builder()
                .content(request.getContent())
                .user(user)
                .post(post)  // 👈 Bắt buộc phải set post vào comment
                .createdAt(LocalDateTime.now()) // Set thời gian tạo
                .updatedAt(LocalDateTime.now()) // Set thời gian cập nhật
                .build();

        // Lưu comment vào database
        Comment savedComment = commentRepository.save(comment);

        // Trả về response
        return commentMapper.toCommentResponse(savedComment);
    }

//    @org.springframework.transaction.annotation.Transactional
//    public String deletePost(String postId, String userId) {
//        Post post = postRepository.findById(postId)
//                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
//
//        if (!post.getUser().getId().equals(userId)) {
//            throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);
//        }
//
//        // Xóa các bản ghi liên quan trong bảng saved_posts trước khi xóa bài viết
//        savedPostRepository.deleteByPostId(postId);
//
//        // Xóa bài viết
//        postRepository.delete(post);
//        return "Post deleted successfully";
//    }



    /**
     * Lấy tất cả bài viết
     */
//    public List<PostResponse> getAllPosts() {
//        return postRepository.findAll()
//                .stream()
//                .map(postMapper::toPostResponse)
//                .collect(Collectors.toList());
//    }

    /**
     * Lấy Comment theo Id
     */
    public List<CommentResponse> getCommentsByPostId(String postId) {
        // Kiểm tra xem bài viết có tồn tại không
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));

        // Lấy danh sách comment của bài viết
        List<Comment> comments = commentRepository.findByPost_Id(postId);

        // Chuyển đổi danh sách comment thành danh sách CommentResponse
        return comments.stream()
                .map(commentMapper::toCommentResponse)
                .collect(Collectors.toList());
    }

    public CommentResponse getCommentById(String commentId) {
        // Tìm bình luận theo ID
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        // Chuyển đổi thành CommentResponse và trả về
        return commentMapper.toCommentResponse(comment);
    }

    /**
     * Lấy danh sách bài viết theo userId
     */
//    public List<PostResponse> getPostByUserId(String userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
//
//        return postRepository.findByUser(user)
//                .stream()
//                .map(postMapper::toPostResponse)
//                .collect(Collectors.toList());
//    }

    /**
     * Cập nhật nội dung bài viết
     */
//    @org.springframework.transaction.annotation.Transactional
//    public PostResponse updatePost(String postId,String userId, PostUpdateRequest request) {
//        Post post = postRepository.findById(userId)
//                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
//
//        if (request.getCaption() != null) {
//            post.setCaption(request.getCaption());
//        }
//        if (request.getImageUrl() != null) {
//            post.setImageUrl(request.getImageUrl());
//        }
//        if (request.getVideoUrl() != null) {
//            post.setVideoUrl(request.getVideoUrl());
//        }
//
//        post.setUpdatedAt(LocalDateTime.now());
//
//        return postMapper.toPostResponse(postRepository.save(post));
//    }

    /**
     * Người dùng thích Comment
     */
    //Phương thức likePost(String postId, String userId) xử lý việc thích (like) hoặc bỏ thích (unlike) một bài viết.
    //Nếu người dùng đã thích bài viết trước đó, hệ thống sẽ xóa lượt thích (Unlike).
    //Nếu chưa thích, hệ thống sẽ thêm lượt thích (Like).
    //@org.springframework.transaction.annotation.Transactional
    @org.springframework.transaction.annotation.Transactional
    public CommentResponse likeComment(String commentId, String username) {
        // Tìm bình luận theo commentId
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        // Tìm người dùng theo userId
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Kiểm tra xem người dùng đã thích bình luận chưa
        if (comment.getLikedUsers().contains(user)) {
            // Nếu đã thích thì bỏ thích
            comment.getLikedUsers().remove(user);
        } else {
            // Nếu chưa thích thì thêm vào danh sách likedUsers
            comment.getLikedUsers().add(user);
        }

        // Lưu bình luận đã cập nhật vào database
        commentRepository.save(comment);

        // Chuyển đổi sang CommentResponse và trả về
        return commentMapper.toCommentResponse(comment);
    }

}

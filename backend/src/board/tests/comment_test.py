from unittest.mock import patch

from django.test import TestCase

from board.models import (
    User, Post, PostContent, PostConfig,
    Profile, Comment, Notify)


class CommentTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(
            username='author',
            password='test',
        )

        Profile.objects.create(
            user=User.objects.get(username='author'),
        )

        User.objects.create_user(
            username='viewer',
            password='test',
        )

        Profile.objects.create(
            user=User.objects.get(username='viewer'),
        )

        Post.objects.create(
            url='test-post',
            title='Post',
            author=User.objects.get(username='author'),
        )

        PostContent.objects.create(
            posts=Post.objects.get(url='test-post'),
            text_md='# Post',
            text_html='<h1>Post</h1>'
        )

        PostConfig.objects.create(
            posts=Post.objects.get(url='test-post'),
            hide=False,
            advertise=False,
        )

        Comment.objects.create(
            post=Post.objects.get(url='test-post'),
            author=User.objects.get(username='viewer'),
            text_md='Comment',
            text_html='<p>Comment</p>',
        )

    def test_get_post_comment_list(self):
        response = self.client.get('/v1/posts/test-post/comments')
        self.assertEqual(response.status_code, 200)

    @patch('modules.markdown.parse_to_html', return_value='<h1>Mocked Text</h1>')
    def test_create_comment(self, mock_service):
        self.client.login(username='viewer', password='test')
        data = {
            'comment_md': '# New Comment',
        }
        response = self.client.post('/v1/comments?url=test-post', data)
        self.assertEqual(response.status_code, 200)

    @patch('modules.markdown.parse_to_html', return_value='<h1>Mocked Text</h1>')
    def test_user_tag_on_comment(self, mock_service):
        self.client.login(username='author', password='test')
        data = {
            'comment_md': '`@viewer` reply comment',
        }
        self.client.post('/v1/comments?url=test-post', data)

        last_notify = Notify.objects.filter(
            user=User.objects.get(username='viewer'),
        ).last()
        self.assertTrue('@author' in last_notify.infomation)
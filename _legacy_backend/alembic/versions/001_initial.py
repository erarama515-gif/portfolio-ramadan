"""initial schema

Revision ID: 001_initial
Create Date: 2026-05-21
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # users
    op.create_table('users',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('username', sa.String(), unique=True, index=True),
        sa.Column('email', sa.String(), unique=True, index=True),
        sa.Column('hashed_password', sa.String()),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('created_at', sa.DateTime()),
    )

    # profiles
    op.create_table('profiles',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('name', sa.String()),
        sa.Column('role', sa.String()),
        sa.Column('bio', sa.Text()),
        sa.Column('location', sa.String()),
        sa.Column('email', sa.String()),
        sa.Column('experience', sa.String()),
        sa.Column('focus', sa.String()),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('cv_url', sa.String(), nullable=True),
    )

    # hero_sections
    op.create_table('hero_sections',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('headline', sa.String()),
        sa.Column('subheadline', sa.Text()),
        sa.Column('typing_words', sa.JSON()),
        sa.Column('cta_primary', sa.String()),
        sa.Column('cta_secondary', sa.String()),
        sa.Column('show_cv_btn', sa.Boolean(), default=True),
        sa.Column('show_status_badge', sa.Boolean(), default=True),
        sa.Column('status_text', sa.String()),
        sa.Column('bg_neural', sa.Boolean(), default=True),
        sa.Column('bg_grid', sa.Boolean(), default=True),
    )

    # projects
    op.create_table('projects',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('icon', sa.String()),
        sa.Column('name', sa.String()),
        sa.Column('description', sa.Text()),
        sa.Column('long_description', sa.Text(), nullable=True),
        sa.Column('tags', sa.JSON()),
        sa.Column('demo_url', sa.String(), nullable=True),
        sa.Column('github_url', sa.String(), nullable=True),
        sa.Column('image_url', sa.String(), nullable=True),
        sa.Column('status', sa.String(), default='draft'),
        sa.Column('sort_order', sa.Integer(), default=0),
        sa.Column('metrics', sa.JSON()),
    )

    # skills
    op.create_table('skills',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('name', sa.String()),
        sa.Column('percentage', sa.Integer()),
        sa.Column('category', sa.String()),
        sa.Column('sort_order', sa.Integer(), default=0),
    )

    # tech_stack
    op.create_table('tech_stack',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('name', sa.String()),
        sa.Column('color', sa.String()),
        sa.Column('sort_order', sa.Integer(), default=0),
    )

    # services
    op.create_table('services',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('icon', sa.String()),
        sa.Column('title', sa.String()),
        sa.Column('description', sa.Text()),
        sa.Column('sort_order', sa.Integer(), default=0),
    )

    # timeline_items
    op.create_table('timeline_items',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('year', sa.String()),
        sa.Column('title', sa.String()),
        sa.Column('subtitle', sa.Text()),
        sa.Column('sort_order', sa.Integer(), default=0),
    )

    # terminal_logs
    op.create_table('terminal_logs',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('tag', sa.String()),
        sa.Column('tag_type', sa.String()),
        sa.Column('message', sa.Text()),
        sa.Column('sort_order', sa.Integer(), default=0),
        sa.Column('active', sa.Boolean(), default=True),
    )

    # ticker_messages
    op.create_table('ticker_messages',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('tag', sa.String()),
        sa.Column('tag_type', sa.String()),
        sa.Column('message', sa.Text()),
        sa.Column('active', sa.Boolean(), default=True),
    )

    # social_links
    op.create_table('social_links',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('platform', sa.String()),
        sa.Column('icon', sa.String()),
        sa.Column('url', sa.String()),
    )

    # seo_settings
    op.create_table('seo_settings',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('title', sa.String()),
        sa.Column('description', sa.Text()),
        sa.Column('keywords', sa.String()),
        sa.Column('og_image', sa.String(), nullable=True),
        sa.Column('canonical_url', sa.String(), nullable=True),
        sa.Column('twitter_handle', sa.String(), nullable=True),
    )

    # site_settings
    op.create_table('site_settings',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('show_hire_btn', sa.Boolean(), default=True),
        sa.Column('show_terminal', sa.Boolean(), default=True),
        sa.Column('show_ticker', sa.Boolean(), default=True),
        sa.Column('show_architecture', sa.Boolean(), default=True),
        sa.Column('show_contact_form', sa.Boolean(), default=True),
        sa.Column('show_cv_btn', sa.Boolean(), default=True),
        sa.Column('available_for_work', sa.Boolean(), default=True),
        sa.Column('show_book', sa.Boolean(), default=True),
    )

    # books
    op.create_table('books',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('title', sa.String()),
        sa.Column('subtitle', sa.String(), nullable=True),
        sa.Column('tagline', sa.Text()),
        sa.Column('description', sa.Text()),
        sa.Column('cover_url', sa.String(), nullable=True),
        sa.Column('status', sa.String(), default='coming_soon'),
        sa.Column('release_date', sa.String(), nullable=True),
        sa.Column('preorder_url', sa.String(), nullable=True),
        sa.Column('chapters', sa.JSON()),
        sa.Column('quotes', sa.JSON()),
    )

    # contact_messages
    op.create_table('contact_messages',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('name', sa.String()),
        sa.Column('email', sa.String()),
        sa.Column('subject', sa.String(), nullable=True),
        sa.Column('message', sa.Text()),
        sa.Column('read', sa.Boolean(), default=False),
        sa.Column('created_at', sa.DateTime()),
    )


def downgrade() -> None:
    for t in ['contact_messages', 'books', 'site_settings', 'seo_settings',
              'social_links', 'ticker_messages', 'terminal_logs', 'timeline_items',
              'services', 'tech_stack', 'skills', 'projects', 'hero_sections',
              'profiles', 'users']:
        op.drop_table(t)

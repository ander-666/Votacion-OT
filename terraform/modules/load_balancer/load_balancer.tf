
resource "aws_lb" "frontend_lb" {
  name               = "frontend-lb"
  internal           = false
  load_balancer_type = "application"

  # ✅ nombre correcto
  security_groups = [var.ecs_sg_id]

  # ✅ subredes creadas con count
  subnets = var.subnet_ids

  enable_deletion_protection = false
  enable_http2               = true
}

resource "aws_lb_target_group" "frontend_target_group" {
  name        = "frontend-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = "/"
    matcher             = "200-399"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

}

# --- 1) Target group para el proxy de Kong ---
resource "aws_lb_target_group" "kong_proxy_tg" {
  name        = "kong-proxy-tg"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"


  health_check {
    path                = "/free"
    matcher             = "200-399"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener" "frontend_listener" {
  load_balancer_arn = aws_lb.frontend_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_target_group.arn
  }
}

resource "aws_lb_listener" "kong_proxy_listener" {
  load_balancer_arn = aws_lb.frontend_lb.arn
  port              = 8000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.kong_proxy_tg.arn
  }
}

output "tg_kong_public_arn" {
  description = "ARN del target group kong admin"
  value       = aws_lb_target_group.kong_proxy_tg.arn
}

output "tg_frontend_public_arn" {
  description = "ARN del target"
  value       = aws_lb_target_group.frontend_target_group.arn
}

output "public_dns_name" {
  description = "ARN del target"
  value       = aws_lb.frontend_lb.dns_name
}
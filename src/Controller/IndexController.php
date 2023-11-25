<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route('/')]
    public function index(): Response
    {
        return $this->render('index/index.html.twig');
    }

    #[Route('/private', name: 'app_private')]
    public function private(): Response
    {
        return $this->render('index/private.html.twig');
    }
}

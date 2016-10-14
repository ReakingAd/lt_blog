@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                @include('project/createProjectModel')
            @if(isset($projects))
                @foreach($projects as $project)
                    <div class="col-sm-6 col-md-3">
                        <div class="thumbnail">
                            <ul class="icon-bar">
                                @include('project._deleteForm')
                                {{--@include('project.editForm')--}}
                                <li>
                                    <!-- Button trigger modal -->
                                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal"
                                            data-target="#editModel-{{
                                        $project->id
                                        }}">
                                        <i class="fa fa-btn fa-cog"></i>
                                    </button>
                                </li>
                            </ul>
                            <a href="{{route('project.show',$project->id)}}"><img
                                        src="{{asset('thumbnail/'.$project->thumbnail)}}" alt="{{$project->name}}"></a>
                            <div class="caption">
                                <a href="#">
                                    <h3 class="text-center">{{$project->name}}</h3>
                                </a>
                            </div>
                        </div>
                        @include('project._editModel')
                    </div>
                @endforeach
            @endif
            </div>

        </div>
    </div>
@endsection

@section('customJS')
    <script>
        $(document).ready(function () {
            $('.icon-bar').hide();
            $('.thumbnail').hover(function () {
                $(this).find('.icon-bar').toggle();
            })
        })
    </script>
@endsection